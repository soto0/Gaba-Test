/** Единая проверка статуса и парсинг JSON для запросов к DummyJSON. */
export const readJson = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `DummyJSON ${res.status}: ${text.slice(0, 200) || res.statusText}`,
    );
  }
  return res.json() as Promise<T>;
};
