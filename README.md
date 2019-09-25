# Asset Manager
本项目基于此开源项目: [AssetCleanerForCocosCreator](https://github.com/foupwang/AssetCleanerForCocosCreator)  二次开发 ，感谢原开发者的工作！我在此基础上添加了` 通过uuid查找使用中的资源 `这一功能，并且简化了使用方法，原项目是使用命令行操作，现在可以直接运行`.bat`文件进行操作。

## 1. 为什么需要Asset Cleaner
- 随着产品功能增加、版本迭代、需求变更，CocosCreator工程里的资源越来越臃肿，其中有不少不再使用或未及时删除的资源（不仅仅是图片，还包括序列帧动画、Spine动画、Prefab等等），如何知道哪些资源是可以删除的？一个个手动查找是不能忍受的。
- 产品上线前，优化包体大小是不可避免的问题，包体里究竟有什么资源？哪些资源最占空间？它们的分布比例怎样？
**`AssetCleaner`为解决以上CocosCreator资源问题而生**
## 2. AssetCleaner功能
- 自动查找CocosCreator工程中未引用的资源，并把所有未引用资源信息输出到指定文件，方便自己核对无误后删除。

**支持以下文件类型**

  1）.png/.jpg/.webp（包括普通图片、图集、Spine、DragonBone、艺术数字）
  
  2）.prefab
  
  3）.anim

**不支持文件类型**
  
  1）. ts,js脚本

- 统计指定目录下所有文件信息，并按类型区分从大到小输出到指定文件，方便后续分析做重点优化。

## 3. AssetCleaner使用：

  **Tip**: `AssetCleaner`基于`Node.js`开发，所以需要先安装`Node.js`。
  
  3个bat文件，对应三种功能。

1). `查找未使用文件`。 需要填写`setings.json`里的`find_unused`里的参数。

2). `查找未使用文件并排序`。需要填写`setings.json`里的`find_unused_sort`里的参数。

3). `根据uuid查找使用的文件`。需要填写`setings.json`里的`find_by_uuid`里的参数。



## 4. setings.json

如果根目录没有`setings.json`文件，则随便双击某个`.bat`文件，第一次运行时会创建一个第一次运行时会创建seting.json文件，填写setings.json里的参数后，再次运行。

```
{
    "find_unused": {
        "desc": "查找未使用的素材", // 描述信息
        "src_path": "", // input: 源目录为项目的assets目录
        "out_path": "../out/unused_res.txt"// 输入日志路径，默认填写不必修改
    },
    "find_unused_sort": {
        "desc": "查找未使用的素材并排序",// 描述信息
        "src_path": "",// input: 源目录为项目的assets目录
        "out_path": "../out/res-sorted-by-size.txt"// 输入日志路径，默认填写不必修改
    },
    "find_by_uuid": {
        "desc": "查找使用指定uuid的素材",// 描述信息
        "src_path": "",// input: 源目录为项目的assets目录
        "out_path": "../out/find_res.txt",// 输入日志路径，默认填写不必修改
        "uuid": "" // input: 需要查找的uuid
    }
}
```

## 4. QA
#### 1、AssetCleaner会自动清除文件吗？
不会。AssetCleaner只是分析并把统计结果输出到文件，实际删除需自己手动操作。
#### 2、AssetCleaner为什么不做成Creator插件？
命令行可以更好的结合自动化构建流程，便于拓展。
#### 3、AssetCleaner的局限
查找未引用资源功能，目前只对assets目录下的静态资源有效，计划在后面加入resources（动态资源）、js代码的支持。
