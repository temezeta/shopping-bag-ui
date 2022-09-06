import ApiClient from '../client';

// A mock function to mimic making an async request for data
export async function fetchCount(amount = 1): Promise<{ data: number }> {
    // THIS IS AN EXAMPLE OF USING THE BACKEND
    const response = await ApiClient.get('WeatherForecast');
    if (response.ok) {
        console.log(await response.json());
    }

    return await new Promise<{ data: number }>((resolve) =>
        setTimeout(() => resolve({ data: amount }), 500)
    );
}
