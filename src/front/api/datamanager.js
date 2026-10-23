class DataManager {
  constructor() {
    // this.user = user;
    // this.dashboard = dashboard;
    // this.cache = new Map();
    console.log('[DataManager] 初始化完成'); // 全局只会打印一次
  }
  

  log(){
    console.log("test");
  }
}

// 重点：在这里直接 new 出单例并导出
const dataManager = new DataManager();
export default dataManager;