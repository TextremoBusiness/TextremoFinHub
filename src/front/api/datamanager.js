import Dexie from 'dexie';

const COUNTRIES = [
  'ad', 'ae', 'af', 'ag', 'ai', 'al', 'am', 'ao', 'aq', 'ar',
  'as', 'at', 'au', 'aw', 'ax', 'az', 'ba', 'bb', 'bd', 'be',
  'bf', 'bg', 'bh', 'bi', 'bj', 'bl', 'bm', 'bn', 'bo', 'bq',
  'br', 'bs', 'bt', 'bv', 'bw', 'by', 'bz', 'ca', 'cc', 'cd',
  'cf', 'cg', 'ch', 'ci', 'ck', 'cl', 'cm', 'cn', 'co', 'cr',
  'cu', 'cv', 'cw', 'cx', 'cy', 'cz', 'de', 'dj', 'dk', 'dm',
  'do', 'dz', 'ec', 'ee', 'eg', 'eh', 'er', 'es', 'et', 'fi',
  'fj', 'fk', 'fm', 'fo', 'fr', 'ga', 'gb', 'gd', 'ge', 'gf',
  'gg', 'gh', 'gi', 'gl', 'gm', 'gn', 'gp', 'gq', 'gr', 'gs',
  'gt', 'gu', 'gw', 'gy', 'hk', 'hm', 'hn', 'hr', 'ht', 'hu',
  'id', 'ie', 'il', 'im', 'in', 'io', 'iq', 'ir', 'is', 'it',
  'je', 'jm', 'jo', 'jp', 'ke', 'kg', 'kh', 'ki', 'km', 'kn',
  'kp', 'kr', 'kw', 'ky', 'kz', 'la', 'lb', 'lc', 'li', 'lk',
  'lr', 'ls', 'lt', 'lu', 'lv', 'ly', 'ma', 'mc', 'md', 'me',
  'mf', 'mg', 'mh', 'mk', 'ml', 'mm', 'mn', 'mo', 'mp', 'mq',
  'mr', 'ms', 'mt', 'mu', 'mv', 'mw', 'mx', 'my', 'mz', 'na',
  'nc', 'ne', 'nf', 'ng', 'ni', 'nl', 'no', 'np', 'nr', 'nu',
  'nz', 'om', 'pa', 'pe', 'pf', 'pg', 'ph', 'pk', 'pl', 'pm',
  'pn', 'pr', 'ps', 'pt', 'pw', 'py', 'qa', 're', 'ro', 'rs',
  'ru', 'rw', 'sa', 'sb', 'sc', 'sd', 'se', 'sg', 'sh', 'si',
  'sj', 'sk', 'sl', 'sm', 'sn', 'so', 'sr', 'ss', 'st', 'sv',
  'sx', 'sy', 'sz', 'tc', 'td', 'tf', 'tg', 'th', 'tj', 'tk',
  'tl', 'tm', 'tn', 'to', 'tr', 'tt', 'tv', 'tw', 'tz', 'ua',
  'ug', 'um', 'us', 'uy', 'uz', 'va', 'vc', 've', 'vg', 'vi',
  'vn', 'vu', 'wf', 'ws', 'ye', 'yt', 'za', 'zm', 'zw'
];


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