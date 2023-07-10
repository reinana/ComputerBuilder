config = {
    appTitle: "Buil Your Own PC",
    url : "https://api.recursionist.io/builder/computers?type=",
}

const target = document.getElementById("target");

class CPU {
    constructor(brand, model, benchmark) {
        this.brand = brand; // string
        this.model = model; // string
        this.benchmark = benchmark; // number
    }
}
class GPU {
    constructor(brand, model, benchmark) {
        this.brand = brand;
        this.model = model;
        this.benchmark = benchmark; // number
    }
}
class RAM {
    constructor(brand, model, benchmark) {
        this.brand = brand;
        this.model = model;
        this.benchmark = benchmark; // number
    }
}
class Storage {
    constructor(type, brand, model, benchmark) {
        this.type = type
        this.brand = brand;
        this.model = model;
        this.benchmark = benchmark; // number
    }
}

class PC {
    static count = -1;
    constructor(cpu, gpu, ram, storage) {
        this.pcName = `PC ${PC.count}`;
        this.cpu = cpu;
        this.gpu = gpu;
        this.ram = ram;
        this.storage = storage;
        PC.count += 1;
    }

    getGamingBenchmark() {
        let cpuScore = this.cpu.benchmark * 0.25;
        let gpuScore = this.gpu.benchmark * 0.6;
        let ramScore = this.ram.benchmark * 0.125;
        let storageScore = this.storage.benchmark * 0.025;
        return Math.floor((cpuScore + gpuScore + ramScore + storageScore) * 100) / 100;
    }
    getWorkBenchmark(){
        let cpuScore = this.cpu.benchmark * 0.6;
        let gpuScore = this.gpu.benchmark * 0.25;
        let ramScore = this.ram.benchmark * 0.1;
        let storageScore = this.storage.benchmark * 0.05;
        return Math.floor((cpuScore + gpuScore + ramScore + storageScore) * 100) / 100;
    }    



}
class View {
    // 初期画面表示
    static getInitialPageHTMLString(pc) {

        let navDiv = document.createElement("div");
        navDiv.classList.add("container-fluid");
        navDiv.innerHTML = 
        `
        <nav class="navbar navbar-dark bg-secondary">
        <div class="container-fluid d-flex justify-content-center">
        <span class="navbar-brand fs-1">${config.appTitle}</span>
        </div>
        </nav>
        `
        let mainDiv = document.createElement("div");
        mainDiv.classList.add("main", "container-fluid", "my-2", "bg-succsess");
        mainDiv.innerHTML = 
        `
            <div class="step1 container p-2">
                <h3>Step1: Select your CPU</h3>
                <div class="d-flex">
                    <div class="input-group my-3 me-3">
                        <label for="cpu-brand" class="col-form-label me-2">Brand</label>
                        <select class="form-select" id="cpu-brand">
                        </select>
                    </div>
                    <div class="input-group my-3">
                        <label for="cpu-model" class="col-form-label me-2">Model</label>
                        <select class="form-select ms-2" id="cpu-model">
                        </select>
                    </div>
                </div>
            </div>
            <div class="step2 container p-2">
                <h3>Step2: Select your GPU</h3>
                <div class="d-flex">
                    <div class="input-group my-3 me-3">
                        <label for="gpu-brand" class="col-form-label me-2">Brand</label>
                        <select class="form-select ms-2" id="gpu-brand">
                        </select>
                    </div>
                    <div class="input-group my-3">
                        <label for="gpu-model" class="col-form-label me-2">Model</label>
                        <select class="form-select ms-2" id="gpu-model"></select>
                    </div>
                </div>
            </div>
            <div class="step3 container p-2">
                <h3>Step3: Select your memory card</h3>
                <div class="d-flex">
                    <div class="input-group my-3 me-3">
                        <label for="ram-howmany" class="col-form-label me-2">How many?</label>
                        <select class="form-select ms-2" id="ram-howmany">
                        </select>
                    </div>
                    <div class="input-group my-3 me-3">
                        <label for="ram-brand" class="col-form-label me-2">Brand</label>
                        <select class="form-select ms-2" id="ram-brand">
                        </select>
                    </div>
                    <div class="input-group my-3">
                        <label for="ram-model" class="col-form-label me-2">Model</label>
                        <select class="form-select ms-2" id="ram-model">
                        </select>
                    </div>
                </div>
            </div>
            <div class="step4 container p-2">
                <h3>Step4: Choose Your storage</h3>
                <div class="d-flex">
                    <div class="input-group my-3 me-3">
                        <label for="storage-hddssd" class="col-form-label me-2">HDD or SSD</label>
                        <select class="form-select ms-2" id="storage-hddssd">
                            <option>-</option>
                            <option value="hdd">HDD</option>
                            <option value="ssd">SSD</option>
                        </select>
                    </div>
                    <div class="input-group my-3 me-3">
                        <label for="storage-storage" class="col-form-label me-2">Storage</label>
                        <select class="form-select ms-2" id="storage-storage">
                        </select>
                    </div>
                    <div class="input-group my-3">
                        <label for="storage-brand" class="col-form-label me-2">Brand</label>
                        <select class="form-select ms-2 me-2" id="storage-brand">
                        </select>
                    </div>
                    <div class="input-group my-3">
                        <label for="storage-model" class="col-form-label me-2">Model</label>
                        <select class="form-select ms-2" id="storage-model">
                        </select>
                    </div>
                </div>
            </div>
            <div class="mt-2">
                <button type="button" id="add-btn" class="btn btn-lg">ADD PC</button>
            </div>
        `
        target.append(navDiv, mainDiv);
        document.getElementById("storage-hddssd").addEventListener("change", ()=>Controller.getStorageAllData(pc))
        document.getElementById("add-btn").addEventListener("click", ()=>this.getPCBuildPageHTMLString(pc))            
    }
    // 結果画面表示
    static getPCBuildPageHTMLString(pc) {
        let newPC = new PC(pc.cpu, pc.gpu, pc.ram, pc.storage);
        
        let resultDiv = document.createElement("div");
        resultDiv.classList.add("result", "card", "mt-5");
        resultDiv.innerHTML = 
        `
            <div class="card-body d-flex justify-content-between">
                <div class="d-flex align-items-center m-5">
                    <p class="card-title">PC${PC.count} Specs</p>
                </div>
                <div>
                    <h3>CPU</h3>
                    <p>${newPC.cpu.brand} ${newPC.cpu.model}</p>
                    <h3>GPU</h3>
                    <p>${newPC.gpu.brand} ${newPC.gpu.model}</p>
                    <h3>RAM</h3>
                    <p>${newPC.ram.brand} ${newPC.ram.model}</p>
                    <h3>STORAGE</h3>
                    <p>${newPC.storage.type} ${newPC.storage.brand} ${newPC.storage.model}</p>
                </div>
                <div class="d-flex align-items-end">
                    <p id="gaming" class="card-text m-0 pe-4">Gaming ${newPC.getGamingBenchmark()} %</p>
                    <p id="work" class="card-text">Work ${newPC.getWorkBenchmark()} %</p>
                </div>
            </div>
        `
        target.append(resultDiv);
    }

}

class Controller {
    static startComputerBuild() {
        console.log('start');
        const pc = new PC();
        View.getInitialPageHTMLString(pc);
        this.handleAllData(pc);
    }
    static handleAllData(pc) {
        this.getCPUAllData(pc);
        this.getGPUAllData(pc);
        this.getRAMAllData(pc);
    }

    // option挿入 引数はid, Arrya
    static setOption(id, parts, data, pc) { 
        let dataList =  [];
        switch (parts){
            case 'cpu':
                dataList = this.getCpuBrand(data);
                break;
            case 'gpu':
                dataList = this.getGpuBrand(data);
                break;
            case 'ram-howmany':
                dataList = this.getRAMNumberList(data);
                break;
            case 'ram-brand':
                dataList = this.getRamBrand(data);
                break;
            case 'storage-storage':
                dataList = this.getStorageSizeList(data);
                break;
            case 'storage-brand':
                dataList = this.getStorageBrand(data);
                break;
        }
        id.innerHTML = `<option>-</option>`
        for(let data of dataList) {
            id.innerHTML += `<option value="${data}">${data}</option>`
        }
        if(parts === "cpu") {
            id.addEventListener("change", () => {
                this.setOptionModel(document.getElementById("cpu-model"), parts, this.getCpuList(data), pc)
            })
        }
        else if(parts === "gpu") {
            id.addEventListener("change", () => {
                this.setOptionModel(document.getElementById("gpu-model"), parts, this.getGpuList(data), pc)
            })
        }
        else if(parts === "ram-howmany") {
            id.addEventListener("change", () => {
                this.setOption(document.getElementById("ram-brand"), 'ram-brand', data, pc); // 再帰
            })
        }
        else if(parts === "ram-brand") {
            id.addEventListener("change", () => {
                this.setOptionModel(document.getElementById("ram-model"), parts, this.getRAMList(data), pc)
            })
        }
        else if(parts === "storage-storage") {
            id.addEventListener("change", () => {
                this.setOption(document.getElementById("storage-brand"), 'storage-brand', data, pc)//再帰
            })
        }
        else if(parts === "storage-brand") {
            id.addEventListener("change", () => {
                this.setOptionModel(document.getElementById("storage-model"), parts, this.getStorageList(data), pc)
            })
        }
    }

    // option挿入 引数はid, オブジェクトリストthis.getCpuList(data),
    static setOptionModel(id, parts, objectList, pc) {
        id.innerHTML = `<option>-</option>`
        for(let i=0; i < objectList.length; i++) {
            id.innerHTML += `<option value="${i}">${objectList[i].model}</option>`
        }
        if(parts === 'cpu') {
            id.addEventListener("change", () => {
                let index = id.value;
                let cpu = new CPU(objectList[index].brand, objectList[index].model, objectList[index].benchmark)
                pc.cpu = cpu
            })
        }
        else if(parts === 'gpu') {
            id.addEventListener("change", () => {
                let index = id.value;
                let gpu = new GPU(objectList[index].brand, objectList[index].model, objectList[index].benchmark)
                pc.gpu = gpu
            })
        }
        else if(parts === 'ram-brand') {
            id.addEventListener("change", () => {
                let index = id.value;
                let ram = new RAM(objectList[index].brand, objectList[index].model, objectList[index].benchmark)
                pc.ram = ram;
            })
        }
        else if(parts === 'storage-brand') {
            id.addEventListener("change", () => {
                let index = id.value;
                let storage = new Storage(objectList[index].type, objectList[index].brand, objectList[index].model, objectList[index].benchmark)
                pc.storage = storage;
            })
        }

    }
    // cpuの全データをfetchして必要なものをoptionへ
    static getCPUAllData(pc) {
        const cpuBrandOp = document.getElementById("cpu-brand");
        fetch(config.url + 'cpu')
            .then(res => res.json())
            .then(data => {
                this.setOption(cpuBrandOp,'cpu', data, pc)
            })
            .catch((err) => {
                // エラー
                console.log(err)
            });
    }

    // gpuの全データをfetchして必要なものをoptionへ
    static getGPUAllData(pc) {
        const gpuBrandOp = document.getElementById("gpu-brand");

        fetch(config.url + 'gpu')
            .then(res => res.json())
            .then(data => {
                this.setOption(gpuBrandOp, 'gpu', data, pc)
            })
            .catch((err) => {
                // エラー
                console.log(err)
            });
    }
    
    // ramの全データをfetchして必要なものをoptionへ
    static getRAMAllData(pc) {
        const ramHowmany = document.getElementById("ram-howmany");

        fetch(config.url + 'ram')
            .then(res => res.json())
            .then(data => {
                this.setOption(ramHowmany, 'ram-howmany', data, pc);
            })
            .catch((err) => {
                // エラー
                console.log(err)
            });
    }
    // storageの全データをfetchして必要なものをoptionへ
    static getStorageAllData(pc) {
        const hhdOrSSD = document.getElementById("storage-hddssd").value;
        const storageStorage = document.getElementById("storage-storage");

        fetch(config.url + hhdOrSSD)
            .then(res => res.json())
            .then(data => {
                this.setOption(storageStorage, 'storage-storage', data, pc)
            })
            .catch((err) => {
                // エラー
                console.log(err)
            });
    }
    
    // cpu brandのset化
    static getCpuBrand(data) {
        let cpuBrandData = new Set(data.map(c=>c['Brand']));
        return cpuBrandData
    }
    // cpu modelのset化しない そのブランドのそのモデルは1個だけのはず
    static getCpuList(data) {
        const selectBrand = document.getElementById("cpu-brand").value;

        let cpuList = data
            .filter(c=>c['Brand'] === selectBrand)
            .map(c=>new CPU(selectBrand, c['Model'], c['Benchmark']));
        return cpuList; // 選択したbrandで絞ったインスタンスのリスト
    }
    // gpu brand のset化
    static getGpuBrand(data) {
        let gpuBrandData = new Set(data.map(c=>c['Brand']));
        return gpuBrandData
    }
    // gpu model
    static getGpuList(data) {
        const selectBrand = document.getElementById("gpu-brand").value;
        console.log(data)
        let gpuModelData = data
            .filter(g=>g['Brand'] === selectBrand)
            .map(g=>new GPU(selectBrand, g['Model'], g['Benchmark']));
        return gpuModelData
    }
    // ram modelの中にある数を取得 数×〇GB
    static getNumberinRamModel(str) {
        let arr = str['Model'].split(' ');
        let atX = arr[arr.length-1].indexOf('x')
        let num = arr[arr.length-1].substring(0, atX);
        return parseInt(num);
    }
    static getRAMNumberList(data) {
        let numberList = new Set(data.map((r) => this.getNumberinRamModel(r)));
        return numberList;
    }
    // ram brand のset化
    static getRamBrand(data) {
        const selectNumber = document.getElementById('ram-howmany').value;
        let ramBrandData = new Set(data
            .filter(r=>this.getNumberinRamModel(r) === parseInt(selectNumber))
            .map(r=>r['Brand']));
        return ramBrandData
    }
    // ram model 取得
    static getRAMList(data) {
        const selectNumber = document.getElementById('ram-howmany').value;
        const selectBrand = document.getElementById("ram-brand").value;
        console.log(selectBrand)
        let ramModelData = data
            .filter(r=>r['Brand'] === selectBrand)
            .filter(r=>this.getNumberinRamModel(r) === parseInt(selectNumber))
            .map(r=>new RAM(selectBrand, r['Model'], r['Benchmark']));
        return ramModelData
    }

    // model の GB か TB が含まれる文字を探す
    static getSizeinStorageModel(str) {
        let arr = str.split(' ');
        let sizeStr = arr.filter(s=>s.includes('TB') || s.includes('GB'))
        return sizeStr[0];
    }
    // model の GB か TB が含まれる文字を探す
    static getTBSizeinStorageModel(str) {
        let arr = str.split(' ');
        let sizeStr = arr.filter(s=>s.includes('TB'))
        return sizeStr[0];
    }
    // model の GB か TB が含まれる文字を探す
    static getGBSizeinStorageModel(str) {
        let arr = str.split(' ');
        let sizeStr = arr.filter(s=>s.includes('GB'))
        return sizeStr[0];
    }
    // storage sizeの取得 
    static getStorageSizeList(data) {
        let tbSizeList = Array.from(new Set(data.map(s=>this.getTBSizeinStorageModel(s['Model'])).filter(Boolean))).sort();
        let gbSizeList = Array.from(new Set(data.map(s=>this.getGBSizeinStorageModel(s['Model'])).filter(Boolean))).sort();
        return tbSizeList.concat(gbSizeList);
    }
    // storage brandのset取得
    static getStorageBrand(data) {
        let selectStorage = document.getElementById('storage-storage').value;
        let storageBrandData = new Set(data
            .filter(s=>this.getSizeinStorageModel(s['Model']) === selectStorage)
            .map(s=>s['Brand']));
        return storageBrandData
    }

    // storage modelの取得
    static getStorageList(data) {
        const selectType = document.getElementById('storage-hddssd').value;
        const selectSize = document.getElementById('storage-storage').value;
        const selectBrand = document.getElementById('storage-brand').value;

        let storageModelData = data
            .filter(s=>s['Brand'] === selectBrand)
            .filter(s=>this.getSizeinStorageModel(s['Model']) === selectSize)
            .map(s=>new Storage(selectType, selectBrand, s['Model'], s['Benchmark']));
        return storageModelData
    }


}

Controller.startComputerBuild();
