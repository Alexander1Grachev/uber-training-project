import { MongoClient } from 'mongodb';

async function clearDatabase() {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db('ed-back-lessons-uber-test');
        
        console.log('🚀 Clearing test database...');
        
        // Получить все коллекции и очистить их
        const collections = await db.collections();
        for (const collection of collections) {
            const result = await collection.deleteMany({});
            console.log(`✅ Cleared collection: ${collection.collectionName} (${result.deletedCount} documents)`);
        }
        
        console.log('✅ Database cleared successfully');
    } catch (error) {
        console.error('❌ Error clearing database:', error);
    } finally {
        await client.close();
        console.log('🔚 Connection closed');
    }
}

// Запустить очистку
clearDatabase().catch(console.error);