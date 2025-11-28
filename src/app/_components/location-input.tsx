'use client'

import { useState, useEffect, useRef } from 'react'

type Location = {
  city: string
  country: string
  latitude?: number
  longitude?: number
}

type Props = {
  onLocationSelect: (location: Location) => void
  initialValue?: string
}

export function LocationInput({ onLocationSelect, initialValue = '' }: Props) {
  const [inputValue, setInputValue] = useState(initialValue)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

  useEffect(() => {
    // Load Google Maps Places API script dynamically
    const loadGoogleMapsScript = () => {
      if (typeof window === 'undefined') return
      
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      
      if (!apiKey) {
        console.warn('Google Maps API key not found. LocationInput will work in basic mode.')
        return
      }

      // Check if script is already loaded
      if (window.google && window.google.maps && window.google.maps.places) {
        initAutocomplete()
        return
      }

      setIsLoading(true)
      
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => {
        setIsLoading(false)
        initAutocomplete()
      }
      script.onerror = () => {
        setIsLoading(false)
        console.error('Failed to load Google Maps script')
      }
      
      document.head.appendChild(script)
    }

    const initAutocomplete = () => {
      if (!inputRef.current || !window.google) return

      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ['(cities)'],
          fields: ['address_components', 'geometry', 'name'],
        }
      )

      autocompleteRef.current.addListener('place_changed', handlePlaceSelect)
    }

    const handlePlaceSelect = () => {
      const place = autocompleteRef.current?.getPlace()
      
      if (!place || !place.address_components) {
        return
      }

      let city = ''
      let country = ''
      let latitude: number | undefined
      let longitude: number | undefined

      // Extract city and country from address components
      place.address_components.forEach((component) => {
        const types = component.types
        if (types.includes('locality')) {
          city = component.long_name
        } else if (types.includes('administrative_area_level_1') && !city) {
          city = component.long_name
        } else if (types.includes('country')) {
          country = component.long_name
        }
      })

      // Extract coordinates
      if (place.geometry && place.geometry.location) {
        latitude = place.geometry.location.lat()
        longitude = place.geometry.location.lng()
      }

      if (city || country) {
        const location: Location = {
          city: city || 'Unknown',
          country: country || 'Unknown',
          ...(latitude !== undefined && longitude !== undefined && { latitude, longitude }),
        }
        
        setInputValue(`${city}, ${country}`)
        onLocationSelect(location)
      }
    }

    loadGoogleMapsScript()

    return () => {
      if (autocompleteRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [onLocationSelect])

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    // Allow manual entry in format "City, Country"
    if (!autocompleteRef.current) {
      const parts = value.split(',').map(part => part.trim())
      if (parts.length >= 2) {
        onLocationSelect({
          city: parts[0],
          country: parts[1],
        })
      } else if (parts.length === 1 && parts[0]) {
        onLocationSelect({
          city: parts[0],
          country: 'Global',
        })
      }
    }
  }

  return (
    <div className="location-input-wrapper">
      <label htmlFor="location-input" className="block text-sm font-medium mb-2">
        Location {isLoading && <span className="text-xs text-gray-500">(Loading...)</span>}
      </label>
      <input
        ref={inputRef}
        id="location-input"
        type="text"
        value={inputValue}
        onChange={handleManualInput}
        placeholder="Enter city, country (e.g., Seoul, South Korea)"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        disabled={isLoading}
      />
      <p className="mt-1 text-xs text-gray-500">
        Start typing to see suggestions, or enter manually in format: City, Country
      </p>
    </div>
  )
}

// Extend Window type for Google Maps
declare global {
  interface Window {
    google: typeof google
  }
}
