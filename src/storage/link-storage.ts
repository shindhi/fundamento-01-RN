import AsyncStorage from '@react-native-async-storage/async-storage'

const LINKS_STORAGE_KEY = 'links-storage'

export type LinkStorageProps = {
    id: string
    name: string
    url: string
    category: string
}

async function get(): Promise<LinkStorageProps[]> {
    const storage = await AsyncStorage.getItem(LINKS_STORAGE_KEY)
    const response = storage ? JSON.parse(storage) : []

    return response
}

async function save(newLink: LinkStorageProps) {
    try {
        const storage = await get()
        const update = JSON.stringify([...storage, newLink])

        await AsyncStorage.setItem(LINKS_STORAGE_KEY, update)
    } catch (err) {
       throw err 
    }
}

async function remove(id: string) {
    try {
        const storage = await get()

        const update = storage.filter((link) => link.id !== id)

        await AsyncStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(update))
    } catch (err) {
        throw err
    }
}

export const linkStorage = { get, save, remove }