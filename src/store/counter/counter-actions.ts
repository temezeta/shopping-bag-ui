// A mock function to mimic making an async request for data
export async function fetchCount(amount = 1): Promise<{ data: number }> {
    return await new Promise<{ data: number }>((resolve) =>
        setTimeout(() => resolve({ data: amount }), 500)
    );
}
