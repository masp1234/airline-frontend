import BASE_URL from "../util/baseUrl";

const useFetchData = () => {
    async function fetchData(endpoint: string) {
        const response = await fetch(BASE_URL + endpoint, {
            credentials: 'include'
        });
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
