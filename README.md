# medical-records-parsing

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

# 背景信息
统一命名：
文件上传，取scheme：纠错解析模式
调用解析接口，把txt转化为json：线上解析模式
文本键及其解析对应的文本：
```json
normResult:{
    "scheme1":{
        "解析键名1":"解析值1",
        "解析键名2":"解析值2",
    },
    "scheme2":{
        "解析键名1":"解析值1",
        "解析键名2":"解析值2",
    }
}
```
## 数据库配置
```java
//数据库配置
String url = "jdbc:mysql://111.9.47.74:13000/emr_parser_test";
String user = "root";
String password = "Aliab12!2020";
```


**纠错解析模式**：
demo2/src/main/java/com/example/demo/Demo2Application.java
(待补充)

**前端解析页面参数配置**：
medical-records-parsing/vite.config.js
启动：pnpm dev

纠错页面：
medical-records-parsing/src/views/view-correction-medical/index.vue
medical-records-parsing/src/views/view-correction-medical/right-template.vue


**线上解析模式**：
解析函数：Main.java
解析部署：./src/main/java/org/example/SpringbootExampleApplication.java

纠错解析模式对应的前端页面：
(待补充)

用到的表说明：
https://bvqlwk2vse5.feishu.cn/wiki/ZbeEwfC0mi6dgUkOZ27ciMEGnCd


# 流程策略图
## 线上解析模式





# 调试日志

## 2025-02-20 
Main.java可以出结果，不过出参数目是否对上了尚不清楚

- 检查线上策略用的表是否和本地用的表一样
- 是否是文件上传模块有问题，导致缺少对应的表

## 2025-02-20 
- 提取的内容严重对不上，观测到的情况：
    1. doc_type为空，入参文件中没有任何关于文doc_type的信息
    2. 灾难性后缀提取，即对于没有的键值对，会出现“"记录时间"："：职业：农民病史描述者：本人出生日期：1971年10月20日联系人：张三联系人电话：13999251221联系方式：13999251221主诉：1.重症肌无力，眼肌型2.慢性乙型病毒性肝炎"”的情况

- 从几个方面分析问题：
    - 看spd发的截图，观察是否是相同的错误
    - 看spd的截图是否也没有doc_type信息
    - 对文件上传部分的每一个文件，都做解析测试，观察结果
    - 到对应的表里去看看，是否有中文scheme

- **解决问题的方法**：
    1. ~~测试纠错解析模式后在线解析模式能否成功~~
       1. ~~原表备份，清除~~
       2. ~~可能要到数据库里认为配置一下~~
       3. ~~准备纠错解析模式的数据~~
       4. ~~
    2. 梳理线上解析模式运行逻辑：https://drive.google.com/file/d/1IXVWOs8ls6FICC-28ntz1_zwfonmf-QY/view?usp=sharing，重点关注doc_type获取逻辑
    3. 梳理纠错解析模式的逻辑
    4. 
    5. ~~解析逻辑更改：当表中为Abbb C结构时，应当增加“A”和“ ”之间的内容也要被提取，即原本的去除所有空格，再提取“A”和“C”之间的逻辑，不完全可取。~~
       1. ~~找到空格转换的代码~~
    6. 去掉提取字段前后的冒号
    7. 对./input中的每份文件都解析测试一下
    <!-- 8. 数据库 scheme部分，单增一列，放scheme对应的doc_type，后续解析根据doc_type取scheme直接用这个逻辑 -->
    9. scheme**顺序**问题：**一定要和前端配置的保持一致，后端直接不排序**
    10. 看看前段有没有解决顺序问题：增加键值对后，文档的键值对会不会改
    11. **做一版不排序的**，人工排序一下数据库中的scheme，确保顺序一致，测试，看是否能解决，主要针对spd给的示例文件
    12. 不排序，但关键词过滤要做
    13. **不能用任何old_hp_template中的doc_type**，不是说doc_type符合了就直接用其全部模版，只要匹配到的键值对
    14. **没有doc_type的文件**要怎么办？
        试试查找，获取文本中的键值对，看看和哪个模版的键值对最相似(相似是指模板的键值对都能在文本中找到)，以此获取doc_type
    15. ~~重点看一下二级解析，目前看来没做好~~
    16. 二级解析的内容也要放到rawSeg里
    17. 考虑不同公司模板会不会相互污染
    18. 初始化的表中可以多加点东西
    19. 修改代码中其他注释的问题
    20. gpt查前端表插入某一行发送到后端要怎么做
    21. 纠错之后，旧表要吸纳纠错后的新表内容
    22. 让前端做个拖动条

## 测试流程
将原表中涉及的表备份，删除
找到相关上传的测试用文件
批量上传文件，建新表
测试解析接口得到的结果，必要时专门写个函数用于output和ground_truth比较。看解析结果，准确率，分析不准的原因

和老师说清楚是历史遗留问题：前端无法排序，沿用了之前的逻辑，给出示例文档图


## 2025-02-23要做事项
- 看纠错解析模式上传的文件数目能不能对上
- 给出一个全面的old_hp_template
  - 用LLM从content中多给出一些“解析键名”，把多出来的插入原键名(保留原键名的adm_column，first_node，is_regular_expression)
  - 写个代码，依次插入数据库(不行就用LLM生成一个全面的old_hp_template，用代码插入数据库)

## 2025-02-24要做事项
- 跑通纠错解析模式的前端
- 在纠错解析模式的前端新增功能：运行中间插入
  - 附加功能：拖动

## 2025-02-25要做事项
- 前端页面增加拖动条
- 表操作逻辑：把之前发送到前端的对应行全删了，把前端新配置的表插入到数据库中