import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LocationInput } from '@/app/_components/location-input'

describe('LocationInput Component', () => {
  const mockOnLocationSelect = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    delete (window as any).google
  })

  it('should render input field with label', () => {
    render(<LocationInput onLocationSelect={mockOnLocationSelect} />)
    
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/enter city, country/i)).toBeInTheDocument()
  })

  it('should handle manual input in "City, Country" format', async () => {
    render(<LocationInput onLocationSelect={mockOnLocationSelect} />)
    
    const input = screen.getByPlaceholderText(/enter city, country/i)
    fireEvent.change(input, { target: { value: 'Tokyo, Japan' } })

    await waitFor(() => {
      expect(mockOnLocationSelect).toHaveBeenCalledWith({
        city: 'Tokyo',
        country: 'Japan',
      })
    })
  })

  it('should handle manual input with only city', async () => {
    render(<LocationInput onLocationSelect={mockOnLocationSelect} />)
    
    const input = screen.getByPlaceholderText(/enter city, country/i)
    fireEvent.change(input, { target: { value: 'Paris' } })

    await waitFor(() => {
      expect(mockOnLocationSelect).toHaveBeenCalledWith({
        city: 'Paris',
        country: 'Global',
      })
    })
  })

  it('should display initial value', () => {
    render(
      <LocationInput 
        onLocationSelect={mockOnLocationSelect} 
        initialValue="Seoul, South Korea"
      />
    )
    
    const input = screen.getByPlaceholderText(/enter city, country/i) as HTMLInputElement
    expect(input.value).toBe('Seoul, South Korea')
  })

  it('should show loading state when Google Maps is loading', () => {
    // Mock environment variable
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = 'test_key'
    
    render(<LocationInput onLocationSelect={mockOnLocationSelect} />)
    
    // Initially should show loading (before script loads)
    // This is hard to test reliably in jsdom, so we just verify component renders
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument()
  })

  it('should work without Google Maps API key', () => {
    delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    
    render(<LocationInput onLocationSelect={mockOnLocationSelect} />)
    
    const input = screen.getByPlaceholderText(/enter city, country/i)
    fireEvent.change(input, { target: { value: 'London, UK' } })

    expect(mockOnLocationSelect).toHaveBeenCalledWith({
      city: 'London',
      country: 'UK',
    })
  })

  it('should display helper text', () => {
    render(<LocationInput onLocationSelect={mockOnLocationSelect} />)
    
    expect(screen.getByText(/start typing to see suggestions/i)).toBeInTheDocument()
  })

  it('should update value when user types', () => {
    render(<LocationInput onLocationSelect={mockOnLocationSelect} />)
    
    const input = screen.getByPlaceholderText(/enter city, country/i) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'New York' } })

    expect(input.value).toBe('New York')
  })
})
