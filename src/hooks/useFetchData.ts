const useFetchData = () => {
    async function fetchData(url: string) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        return data;
    }

    return { fetchData };
};

export {
    useFetchData
}
