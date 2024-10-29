import { useErrorToast } from "../toasts/fetchError.ts";

const useFetchData = () => {
    const { showErrorToast } = useErrorToast();

    async function fetchData<T>(url: string, setData: (data: T[]) => void, resourceName: string) {
        let data = null;
        try {
            const response = await fetch(url);
            data = await response.json();
            setData(data[resourceName]);
        } catch {
            showErrorToast(resourceName);
        }
        return data[resourceName];
    }

    return { fetchData };
};

export {
    useFetchData
}
