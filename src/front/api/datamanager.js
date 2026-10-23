import Dexie from 'dexie';

class DataManager {
    constructor() {
        this.db = new Dexie('Nesta');
        this.db.version(1).stores({
            countries: '++id, code, children'
        })
        this.isDbInit = false;
        this.isDbPersisted = false;
        

        // this.user = user;
        // this.dashboard = dashboard;
        // this.cache = new Map();
    }

    /* dB related functions */
    async dbInit(){
        if (this.isDbInit) return;
        await this.dbApplyPersistent();
        await this.db.open();
        this.isInitialized = true;
        console.log('[DataManager] 初始化完成'); // 全局只会打印一次
    }
    async dbApplyPersistent(){
        if (typeof window === 'undefined' || !navigator.storage || !navigator.storage.persist){
            console.warn('[DataManager] 当前环境不支持 StorageManager API');
            return false;
        }
        try {
            // 1. 检查是否已经是持久化存储
            const persisted = await navigator.storage.persisted();
            if (persisted) {
                console.log('[DataManager] 存储已是持久化状态 (Persistent)');
                this.isDbPersisted = true;
                return true;
            }

            // 2. 发起申请
            const granted = await navigator.storage.persist();
            this.isDbPersisted = granted;
            console.log(`[DataManager] 持久化申请结果: ${granted ? '成功' : '失败'}`);
            return granted;
        } catch (error) {
            console.error('[DataManager] 申请持久化存储异常:', error);
            return false;
        }
    }


    log(){
        console.log("test");
    }
}

// 重点：在这里直接 new 出单例并导出
const dataManager = new DataManager();
export default dataManager;