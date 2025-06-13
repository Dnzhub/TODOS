const STORAGE_KEY = "todoApp";

export function save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
}