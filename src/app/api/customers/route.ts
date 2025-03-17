import { NextResponse } from 'next/server';

// Mock data for now - replace with actual database connection
const customers = [
    {
        id: 1,
        firstname: 'Johan',
        lastname: 'Andersson',
        email: 'johan@example.com',
        password: 'hashed_password', // In real app, this would be properly hashed
        phone: '070-123-4567',
        street_address: 'Skidvägen 42',
        postal_code: '12345',
        city: 'Stockholm',
        country: 'Sweden',
        created_at: '2025-03-01T10:00:00Z'
    },
    {
        id: 2,
        firstname: 'Maria',
        lastname: 'Johansson',
        email: 'maria@example.com',
        password: 'hashed_password',
        phone: '070-987-6543',
        street_address: 'Fjällgatan 15',
        postal_code: '54321',
        city: 'Göteborg',
        country: 'Sweden',
        created_at: '2025-03-02T14:30:00Z'
    }
    ];

    export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        const customer = customers.find(c => c.id === parseInt(id));
        if (!customer) {
        return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
        }
        
        // Don't return password in response
        const { password, ...customerData } = customer;
        return NextResponse.json(customerData);
    }

    // Return all customers without passwords
    const safeCustomers = customers.map(({ password, ...rest }) => rest);
    return NextResponse.json(safeCustomers);
    }

    export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Validate required fields
        if (!body.firstname || !body.lastname || !body.email || !body.password) {
        return NextResponse.json(
            { error: 'Missing required fields' },
            { status: 400 }
        );
        }
        
        // Check if email already exists
        if (customers.some(c => c.email === body.email)) {
        return NextResponse.json(
            { error: 'Email already in use' },
            { status: 400 }
        );
        }
        
        // In a real app, you would hash the password and save to database here
        const newCustomer = {
        id: customers.length + 1,
        ...body,
        created_at: new Date().toISOString()
        };
        
        // Don't return password in response
        const { password, ...customerData } = newCustomer;
        return NextResponse.json(customerData, { status: 201 });
    } catch (error) {
        return NextResponse.json(
        { error: 'Failed to create customer' },
        { status: 500 }
        );
    }
}
