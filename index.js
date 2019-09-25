const fs = require("fs");
const parseCommand = require("./src/main");

(function () {
    console.log(`\n***************************************************\n`);
    let setting_path = "setings.json";
    if (!fs.existsSync(setting_path)) {
        let default_setting = {
            find_unused: { desc: "查找未使用的素材", src_path: "", out_path: "../out/unused_res.txt" },
            find_unused_sort: { desc: "查找未使用的素材并排序", src_path: "", out_path: "../out/res-sorted-by-size.txt" },
            find_by_uuid: { desc: "查找使用指定uuid的素材", src_path: "", out_path: "../out/find_res.txt", uuid: "" },
        };
        fs.writeFileSync(setting_path, JSON.stringify(default_setting));
        return console.error(`请填写${setting_path}里的参数！`);
    } else {
        let setting = JSON.parse(fs.readFileSync(setting_path));

        let command = process.argv[2];
        let sourceFile, destFile, uuid, m_detail;
        switch (command) {
            case '-clean':
                if (!setting.find_unused || !setting.find_unused.src_path || !setting.find_unused.out_path) {
                    return console.error(`error: using ${command} cmd, some value is null !`);
                }
                m_detail = setting.find_unused;
                sourceFile = m_detail.src_path;
                destFile = m_detail.out_path;
                break;
            case '-size':
                if (!setting.find_unused_sort || !setting.find_unused_sort.src_path || !setting.find_unused_sort.out_path) {
                    return console.error(`error: using ${command} cmd, some value is null !`);
                }
                m_detail = setting.find_unused_sort;
                sourceFile = m_detail.src_path;
                destFile = m_detail.out_path;
                break;
            case '-find':
                if (!setting.find_by_uuid || !setting.find_by_uuid.src_path || !setting.find_by_uuid.out_path || !setting.find_by_uuid.uuid) {
                    return console.error(`error: using ${command} cmd, some value is null !`);
                }
                m_detail = setting.find_by_uuid;
                sourceFile = m_detail.src_path;
                destFile = m_detail.out_path;
                uuid = m_detail.uuid;
                break;
            default:
                return console.error("error command param :", command);
        };
        parseCommand(command, sourceFile, destFile, uuid);

    }
    console.log(`\n***************************************************\n`);
})();

// 防止命令行弹框关闭。。100s后会关闭
let i = 0;
let handle = setInterval(() => {
    i++;
    if (i >= 100) {
        clearInterval(handle);
    }
}, 1000);