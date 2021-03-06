export default {
  main: {
   // 导航
    home: {
      name: '首页',
      subMenu: {
        indexpage : '系统首页',
        courseTable: '机构课表',
        courseTable2: '我的课表'
      }
    },
    cropper: {
      Upload: '上传图片',
      ImgError: '文件格式不正确',
      ImgBig: '图片大小不能超过1M',
      ImgInfo: '图片信息',
      width: '宽度',
      height: '高度',
      chooseImg: '选择图片',
      uploadAvatar: '上传',
      UploadSuccess: '上传成功',
      UploadFaild: '上传失败'
    },
    courseManage: {
      name: '课程管理',
      subMenu: {
        materialManage: '课件管理',
        courseManage: '课程管理',
      }
    },
    userManage: {
      name: '用户管理',
      subMenu: {
        teacherManage: '老师管理',
        studentManage: '学生管理'
      }
    },
    orderManage: {
      name: '订单管理',
      subMenu: {
        allOrder: '全部订单',
        accountDetails: '账户明细',
        withdrawalSubsidiary: '提现明细',
        checkCenter: '对账中心'
      }
    },
    setting: {
      name: '设置',
      subMenu: {
        authenticationInformation: '认证信息',
      }
    },
    operatingguide :'使用指南'
  },
  Common: {
    web: '门课网',
    web2: '机构管理后台',
    symbol: '￥',
    fisrtpage:'首页',
    trailerpage: '尾页',
    previouspage: '上一页',
    nextpage: '下一页',
    nodata: '暂无数据',
    kindlyreminder: '温馨提示',
    submit: '提交',
    cancel: '取消',
    sure: '确认',
    watch: '查看',
    set: '设置',
    edit: '编辑',
    delete: '删除',
    save: '保存',
    mark: '操作',
    nextstep: '下一步',
    prevstep: '上一步',
    goCheck: '前往查看',
    checkNow: '立即认证',
    checkAfter: '稍后认证',
    know: '知道了',
    single: '1对1',
    samll: '小班课',
    large: '直播课',
    addlesson: '增加课时',
    addfile: '关联课件',
    addtime: '选择时间',
    colon: '：',
    NO: '无',
   
  },
  webInfo:{
    bak: 'Copyright © 门课网 京ICP备17018423号-2'
  },
  // 首页
  homepage:{
    indexpage: '系统首页',
    accountinformation:'账户信息',
    Thelogin:'本次登录',
    quit:'退出',
    amountTrade:'交易总额',
    transactionOrders:'成交订单数',
    totalStudents:'学生总数',
    totalTeachers:'老师总数',
    institutionsOverview :'班级总览',
    studentsoverview :'学生总览',
    statisticsofClassHoursAndStudents:'课时数及学生数统计',
    statisticsOfClassHoursinDifferentTimePeriodsToday :'各时间阶段课时数统计',
    todayNew :'今日新增',
    yesterdayNew:'昨日新增',
    monthincrease:'本月增加',
    admissionclass:'在招生班级',
    today :'今日',
    week : '本周',
    month :'本月',
    total :'总金额',
    order:'订单数',
    classhour :'课时数',
    Numberstudents :'学生数',
    salesstatistics :'销售统计',
    Transactionflowstatistics :'交易流水统计',
    Salesstatisticsinrecentdays:'近7天销售统计',
    Nearly7days :'近7天',
    Nearly30days:'近30天',
    goBack: '返回首页',
  },
  //机构课表
  courseTablepage:{
    courseTablepage :'机构课表',
    Monday   :'周一',
    Tuesday  :'周二',
    Wednesday:'周三',
    Thursday :'周四',
    Friday   :'周五',
    Saturday :'周六',
    Weekday   :'周日',
    Atotalofclass:'共节课',
    status1: '已结束',
    status2: '待上课',
    status3: '未上课',
  },
  //机构课表-课程课表
  calendarSchedule:{
    subtitle: '课程列表',
    enclass: '进教室',
    enclass2: '巡课',
    notStarted: '未开始',
    starttime: '开始时间',
    endtime: '结束时间',
    periodname: '班级名称',
    classtype: '班型',
    teacher: '老师',
  },
  //机构课表-课程课表-课表详情
  LessonDetail:{
    subtitle: '课程详情',
    periodtitle: '课时详情',
    curriculum: '课程简介',
    coursetitle: '课程名称',
    Courseware: '课件列表',
    addCourseware: '添加课件',
    student: '学生列表',
    total:'共*人',
    replay: '课程回放',
    replaytip: '课程回放制作中',
    info: '第*片段',
    comment: '评论列表',
    commentnum: '评论数量',
    unit:'分'
  },
  //课程管理 -分类管理 2017-07-18--huang
  // classifyManagepage :{
  //   classifyManagepage:'分类管理',
  //   Datalist :'数据列表',
  //   systematicname :'分类名称',
  //   reclassify :'二级分类',
  //   seclassify :'三级分类',
  //   level :'级别',
  //   Numbersubclasses :'子类数量',
  //   sort   :'排序',
  //   Whethershown :'是否显示',
  //   operation:'操作',
  //   Addclassification :'添加分类',
  //   editclassification :'编辑分类',
  //   remind1 :'删除该分类，其子类也会被删除，你确定要删除吗？',
  //   remind2 :'请填写分类名称',
  // },
  //课程管理 -课件管理
  materialManagepage :{
    materialManagepage:'课件管理',
    folder:'文件夹',
    newfolder:'新建文件夹',
    Temporaryfolder:'暂无文件夹',
    size:'大小',
    uploading:'上传',
    uploadFile: '上传素材',
    chooseFile: '选择上传课件',
    name :'名称',
    remind1:'该文件夹下有多个文件，删除文件夹会导致文件夹下的文件也被删除，您确定要删除吗？',
    remind2:'您确定要删除该文件夹吗？',
    remind3:'删除该文件后，会导致已经关联该文件的课程无法查看，您确定要删除吗？',
    remind4:'文件上传失败',
    remind5:'文件格式不正确',
    remind6:'文件过大',
    remind7: '确认删除此课件吗？',
    success:'上传成功',
    entersearch :'输入搜索',
    Namecourseware :'课件名称',
    Nameclass :'课程名称',
    addtime :'添加时间',
    unit:'个',
    tip1: '您可以提前上传课件， 创建教室或课程时可以关联课件， 进入直播教室时， 课件会自动关联到教室， 无需再次上传；',
    tip2: "我们支持多种格式的课件， 如( * .xls;*.xlsx;*.ppt;*.pptx;*.doc;*.docx;*.txt;*.pdf;*.jpg;*.gif;*.jpeg;*.png;*.bmp;*.mp3;*.mp4)， 但要求单个课件不超过100M；",
    tip3: '请输入名称'
  },
  symbol: {
    colon: '：',
  },
  //课程管理 -课程管理
  courseManagepage :{
    courseManage:'课程管理',
    courseInfo: '课程信息 ', 
    allcourses:'全部课程',
    on:'已上架',
    Noton:'未上架',
    coursetitle:'课程名称',
    coursetime :'课时信息',
    addcoursetime :'新增课程单元',
    inputkeywords:'输入关键字',
    Coursescoverpage :'课程封页',
    basicprice :'基础价',
    Onofftheshelves :'上/下架',
    operation:'操作',
    Addcourse :'添加课程',
    time :'课时',
    editcourse :'编辑课程信息',
    remind1 :'你确定要删除吗？',
    remind2:'您还未添加分类，暂时无法添加课程。',
    Coursespage :'课程封页',
    addclassmeg :'填写课程信息',
    addclasstime:'填写课时信息',
    basicinformation :'基本信息',
    lessoncourse:'课程分类',
    courseoverview :'课程概述',
    courseclassification:'选择课程分类',
    subtitle:'副标题',
    firstclassification :'一级分类',
    secondclassification :'二级分类',
    thirdclassification :'三级分类',
    remind1:'为保证课程封面显示效果，请上传尺寸为816 * 490像素的图片',
    remind2:'课程名称长度不超过20个汉字，支持中英文输入',
    remind3:'副标题是该可课程的一句话介绍，长度不超过100个汉字，支持中英文输入',
    remind4:'课程概述为该门课程的详细介绍，包括课程结构、课程内容、教学目标等，支持中英文输入',
    remind5:'课程封页不能为空!',
    remind6:'课程名字不能为空!' ,
    remind7:'副标题不能为空！',
    remind8:'课程概述不能为空!',
    remind9:'请选择课程分类！',
    remind11:'选择该课程允许开设班级的类型，允许多选',
    prompt :'请输入单元名称',
    prompt2: '请输入课时名称',
    prompt3: '请输入课时数',
    save:'保存',
    nextstep :'下一步',
    Associatedtext :'关联课件',
    Unitnumber :'单元数',
    Classnumber :'课时数',
    baseprice  :'基础价格',
    money :'元',
    enterbase: '输入课程价格',
    classtype:'开班类型',
    all:'全部',
    on:'上架',
    success   :'完成',
    buyNum: '已购买次数',
    unit:'次',
    tip1: '第*单元',
    tip2: '共*个课时',
    AllEvaluation:'全部评价',
    noSelectTime: '（未设置可预约时间）',
    scheduling: '排课',
    startTime: '开课日期',//新增
    classTime: '上课时间',
    tip01: '单元名称',
    tip02: '课时名称',
    tip1: '单元名称不能为空',
    tip2: '课时名称不能为空',
    tip3: '请选择授课老师',
    tip4: '该老师未设置1对1可预约时间，不能开课',
    tip5: '课程价格不能为空',
    tip6: '请将该地址分享给您的学生：',
    tip7: '学生可以点击该链接查看您添加的课程详细内容；',
    tip8: '学生可以在打开的页面上点击进教室按钮直接进入直播教室；',
    tip9: '您可以点击当前页面“进教室”按钮进入直播教室给学生授课。',

    
    addSuccess: '发布成功',
    tip10: '您的课程已经发布到门课网上，您可以点击下方“查看详情”按钮查看课程的详细内容；',
    tip11: '您可以在“<b>我的课表</b>”中查看每个课时的安排，也可以提前进入直播教室备课；',
    tip12: '您也可以点击“<b>复制课程链接</b>”按钮复制课程的链接，分享给您的学生；',
    tip13: '学生购买课程后，就可以从“<b>我的课表</b>”中进入直播教室上课啦！',
    coursePrice: '课程总价',
    lookBtn: '查看详情',
    copyBtn: '复制课程链接',
    gobackBtn: '返回课程中心',
    copyTip: '课程链接复制成功',
    duration:'时长',
    coursewareName:'课件',
    periodPrice: '课时单价',
    addtip1: '请输入课时单价',
    addtip2: '课时将于',
    addtip3: '分结束',
    addtip4: '请输入课时单价',
    addtip5: '请输入2-50区间的整数',
    addtip6: '请选择上课频次',
    classhourtime:'课时时长',
    batchBtn:'批量排课',
    frequency: '上课频次',
  },
  //课程管理 -排课管理
  arrangManage :{
    arrangManage:'排课管理',
    11:'1对1',
    classname:'班级名称',
    oneclass:'1对1课程',
    privateclass:'小班课',
    livelesson:'直播课',
    serial :'编号',
    total :'总价',
    classtotal :'课程价格',
    classstatus  :'班级状态',
    totalnum :'总报名数',
    numberregistration :'总报名数',
    Whethertheadmissions :'是否招生',
    opening:'开班',
    know :'知道了',
    remind1:'确认删除该课程么',
    remind2:'您确认要启用招生吗？',
    remind3:'暂停招生后学生就无法报名该班级，您确认要暂停招生吗？',
    remind4:'您还未添加课程，暂时无法开设班级。',
    enableadmissions:'启用招生',
    Suspensionadmissions:'暂停招生',
    remind5:'该课已有人报名，不能进行操作',
    remind6:'该课程正在招生中，不能进行操作'
  },
  //用户管理 -老师管理
  teacherManagepage :{
    teacherManagepage:'老师管理',
    teachername: '老师姓名',
    teacherphone:'手机号码',
    serial :'编号',
    total :'总价',
    numberregistration :'总报名数',
    Whethertheadmissions :'是否招生',
    // resetpasswords:'重置密码',
    teachertel:'请输入手机号',
    addteacher  :'添加老师',
    enterteachername :'请输入老师昵称',
    enterteachertel:'请输入手机号码',
    remind1: '删除老师后，该老师所开设的课程将全部停止招生，您确定要删除该老师吗？',
    teacherid: '老师ID',
    teachernickname: '老师昵称',
    loginAcount: '登录帐号',
    copyBtnText: '复制链接',
    copiedBtnText: '已复制',
    InviteMembers: '邀请成员',
    InviteMembersText: '扫描二维码或分享链接邀请成员',
    AddTeacherTip1: '1. 门课网允许机构通过手机号邀请老师加入您的机构授课；',
    AddTeacherTip2: '2. 如果您邀请的老师未在门课网上注册，系统会生成一个二维码和链接，您可以将链接、二维码发送给老师，老师用QQ、微信打开二维码或用浏览器打开链接即可注册成为您机构的老师；',
    AddTeacherTip3: '3. 如果您邀请的老师已经在门课网上注册，系统会自动给老师发送一条邀请短信，老师登录并同意邀请后即可加入您的机构授课；',
    AddTeacherTip4: '4. 您可以主动解除与老师的关联关系，老师也可以发起申请，得到您的同意后即可解除关联。',
    AddTeacherTip5: '5. 为保证您的机构及学生的权益，请确保老师的课程全部授完后才解除关联关系。',
  },
  //用户管理 -老师管理-老师详情
  teacherDetails:{
    teacherDetails: '老师详情',
    unknow:'保密',
    unknow2:'未知',
    male:'男',
    female:'女',
    Enable:'启用',
    Disable: '禁用',
    title: '老师1对1课预约时间',
    checkAll : '全选',
    userID: '用户ID',
    birth: '生日',
    accountstatus: '账户状态',
    addtime: '加入时间',
    area: '所在地',
    profile:'个人简介',
    AddProfile: '该老师很懒，还未填写个人简介...',
    AddProfile2: '该学生很懒，还未填写个人简介...',
  },
  //用户管理 -老师管理-老师详情--编辑资料
  teacherEdit:{
    unbinding: '解绑',
    teacherEdit: '编辑资料',
    logo: '老师头像',
    nickname: '昵称',
    sex: '性别',
    profile: '老师简介',
    password: '新密码',
    repassword: '确认密码',
    prphone :'原手机号',
    newmobile: '新手机号',
    code: '验证码',
    tip1: '（图片格式支持jpg、png）',
    tip2:'（老师姓名只有老师和管理员能看到，学生只能看到昵称）',
    tip3: '请选择日期',
    tip4: '（老师简介不超过100个汉字，支持中英文输入）',
    tip5: '（6～16位，支持数字、字母、下划线）',

  },
  //用户管理 -学生管理
  studentManagepage :{
    studentManagepage: '学生管理',
    useraccount :'用户账号',
    userID:'用户ID',
    nickname:'用户昵称',
    Recently :'最近登录',
    sex: '性别',
    Accountactivationstatus :'账户启用状态',
    tip: '请输入正确的账号格式',
  },
  //用户管理 -学生管理 - 学生详情
  studentDetails:{
    studentDetails: '学生详情',
    title: '已购课程',
    logintime: '最近登录时间',
  },
  //订单管理 - 全部订单
  orderList:{
    orderList: '全部订单',
    status1: '全部',
    status2: '待付款',
    status3: '已取消',
    status4: '已支付',
    status5: '已下单',
    status6: '申请退款',
    status7: '已退款',
    status8: '退款驳回',
    payway: '支付方式',
    paytype1: '其他',
    paytype2: '余额',
    paytype3: '微信',
    paytype4: '支付宝',
    paytype5: '银联',
    tip: '输入订单号',
  },
  //订单管理 - 全部订单 - 订单详情
  orderDetails:{
    orderDetails:'订单详情',
    orderinfo:'订单信息',
    webtype: '下单渠道',
    originprice: '原课程总价',
    discount: '优惠金额',
    amount:'交易金额',
  },
  //订单管理 - 账户明细
  orderManagepage :{
    orderManagepage: '账户明细',
    withdrawalsubsidiary:'提现明细',
    availablebalance :'可用余额',
    Amountsettled:'待结算金额',
    withdrawdeposit :'提现',
    Withdrawalamount:'可提现金额',
    enterWithdrawalamount :'请输入提现金额',
    enterWithdrawalamount2: '请输入正确的提现金额',
    Withdrawalto:'提现到',
    Payment :'收款平台',
    Paytreasure :'支付宝',
    Paytreasurename :'支付宝帐户',
    enterPaytreasurename :'请输入支付宝帐户',
    Paytreasurename2: 'paypal帐户',
    enterPaytreasurename2: '请输入paypal帐户',
    settled :'已结算',
    Forthe :'待结算',
    student :'学生',
    payname:'收款人姓名',
    lecturer:'授课老师',
    reference :'订单编号',
    amount :'订单金额',
    settlement  :'结算时间',
    orderstatus :'订单状态',
    ordertime:'下单时间',
    type:'类型',
    a :'为保障学员的权益，只有当学生所购买的课程全部结束后，学生购买该课程所支付的费用才会结算到您的账户余额',
    b :'您同意学员的退款申请后，所退金额会从原订单中返还，剩余金额自动结算到您的账户余额；',
    c :'您的账户余额可以提现到支付宝或微信，如果您是个人讲师，只能提现到您实名认证时填写的身份证名下的支付宝或微信账户；如果您是机构，则只能提现到机构所对应的支付宝对公账户或微信对公账户下；',
    d :'为保障资金安全，提现申请后会有人工审核，因此会延迟到账，一般不超过7个工作日。',
    status: '已入帐',
  },
  //订单管理 - 提现明细
  withdrawalSubsidiarypage : {
    withdrawal: '提现申请',
    succeed: '成功',
    defeated: '失败',
    week:'一周',
    month :'一个月',
    threemonth :'三个月',
    Transactionnumber: '交易编号',
    ApplicationDate: '申请时间',
    money: '金额',
    Paymentplatform: '收款平台',
    shroffaccountnumber: '收款账号',
    processingtime: '处理时间',
    state: '状态',
  },
  //订单管理 - 对账中心
  withdrawalcheckCenterpage : {
    withdrawalcheckCenterpage:'对账中心',
    time: '时间',
    choosetime:'选择日期',
    reset: '重置',
    search: '搜索',
    ApplicationDate: '登录名',
    nick: '昵称',
    Paymentplatform: '手机号',
    shroffaccountnumber: '完成订单数',
    processingtime: '收入',
  },
  //促销管理 - 课程推荐  20180718--huang
  // courseRecommendpage : {
  //   coursetitle: '课程名称',
  //   inputkeywords: '请输入关键字',
  //   number: '编号',
  //   Classname: '班型/老师/班名',
  //   recommend: '是否推荐',
  //   sort : '排序',
  //   state: '状态',
  //   nodata: '暂无数据',
  // },
  //促销管理 - 老师推荐 ----20180718--huang
  // teacherRecommendpage : {
  //   teachernickname: '老师昵称',
  //   number: '编号',
  //   recommend: '是否推荐',
  //   sort : '排序',
  //   set: '设置',
  //   nodata: '暂无数据',
  // },
  //促销管理 - 首页轮播图  ----20180718--huang
  // homeRunpage : {
  //   pagelist: '广告页列表',
  //   addad: '添加广告',
  //   addtime: '增加课时',
  //   number: '编号',
  //   Nameadvertising: '广告名称',
  //   picurl: '图片地址',
  //   set : '设置',
  //   edit: '编辑',
  //   delete: '删除',
  //   associatedfiles :'关联文件'
  // },
  //设置 - 认证信息
  authenticationInformationpage : {
    title: '认证信息',
    readagreement: '阅读协议',
    materials: '提交申请材料',
    audit: '入驻审核',
  },
  //设置 - 认证信息 -审核状态
  ReviewResult:{
    ReviewResult: '审核状态',
    tip1: '您已经成功入驻！',
    tip2: '您已经成功提交入驻申请，我们会在1~2个工作日内完成审核，',
    tip3: '您提交的申请材料审核不通过，请修改后重新提交！',
    tip4: '审核结果会以短信方式告知，请注意查收!',
    reason: '原因',
  },
  //设置 - 认证信息 - 资料认证查看
  showBasicInfo:{
    showBasicInfo: '资料认证查看',
    BasicInfo: '基本信息',
    contactname: '联系人姓名',
    contactphone: '电话号码',
    contactemail:'联系邮箱',
    organname: '学堂名称',
    summary: '学堂概述',
    logo:'Logo',
    phone: '客服热线',
    email: '客服邮箱',
    domain: '域名',
    des1:'（在门课网上用以展示和传播的名称，12字以内）',
    des2: '（简要介绍自己课堂的优势、特色信息，方便用户获得直观印象，100字内）',
    des3:'（在门课网上用以展示和传播的logo，图片尺寸200*134像素。）',
    des4: '（课堂首页的网址，一旦添加便不可修改，比如填写的域名是abc,则课堂首页的地址为http://abc.51menke.com）',
    des5: '（填写要进行内容服务的认证人姓名）',
    des6: '（请填写中华人民共和国身份证号码（需在有效期内））',
    des7: '（请保证身份证姓名、身份证号码清晰可见。文件小于20M）',
    des8: '（填写企业/机构/学校的名称）',
    des9: '（请和营业执照上注册号码保持一致或三证合一统一社会信用代码，若为学校，则填写相应的办学许可证号）',
    des10: '（请注意保持各项信息可见，且申请时间在有效范围之内。文件小于20M）',
    tip:'请输入内容',

  },
  //设置 - 认证信息 - 提交申请材料
  editBasicInfo:{
    identity :'身份资质',
    idname: '认证人姓名',
    idnum: '身份证号码',
    frontphoto: '手持身份证正面照',
    backphoto: '手持身份证背面照',
    organname: '企业名称',
    organnum: '营业执照号码',
    organphoto: '营业执照扫描件',
    isnull1: '联系人姓名不能为空',
    isnull2: '电话号码不能为空',
    mobilelength: '请输入正确的6-15位手机号码',
    mobilelength1: '请输入正确的6-15位电话号码',
    isnull3: '联系邮箱不能为空',
    emailtype: '请输入正确的邮箱',
    isnull4: '学堂名称不能为空',
    isnull5: '学堂概述不能为空',
    isnull6: 'logo不能为空',
    isnull7: '客服热线不能为空',
    isnull8: '客服邮箱不能为空',
    isnull9: '域名不能为空',
    isnull10: '认证人姓名不能为空',
    isnull11: '身份证号码不能为空',
    isnull12: '法人身份证正面照不能为空',
    isnull13: '法人身份证背面照不能为空',
    isnull14: '企业名称不能为空',
    isnull15: '营业执照不能为空',
    isnull16: '营业执照扫描件不能为空',
    isnull17: '法人身份证正面照不能为空',
    isnull18: '法人身份证背面照不能为空',
  },
  //设置 - 课堂配置
  instConfig: {
    menu: "课堂配置",
    title: "课堂配置",
    minute: "分钟",
    person: "人",
    home: "家",
    fromText: {
      toOneTit: "1对1授课时长：",
      toOneEmpty: "1对1授课时长不能为空！",
      toOneLimit: "1对1授课时长不能超过300分钟",
      toOneTip: "本机构开设的1对1课程，每节课的时间长度，默认为25分钟。",
      smallTimeTit: "小班课授课时长：",
      smallTimeEmpty: "小班课时长不能为空！",
      smallTimeLimit: "小班课时长不能超过300分钟",
      smallTimeTip: "本机构开设的小班课课程，每节课的时间长度，默认为45分钟。",
      bigTimeTit: "直播课授课时长：",
      bigTimeEmpty: "直播课时长不能为空！",
      bigTimeLimit: "直播课时长不能超过300分钟",
      bigTimeTip: "本机构开设的直播课课程，每节课的时间长度，默认为45分钟。",
      smallNumTit: "小班课人数上限：",
      smallNumEmpty: "小班课人数上限不能为空！",
      smallNumTip: "本机构开设的小班课，允许进入的最多学生数，默认为12。",
      bigNumTit: "直播课人数上限：",
      bigNumEmpty: "直播课人数上限不能为空！",
      bigNumTip: "本机构开设的直播课，允许进入的最多学生数，默认为1000。"
    },
  },
  add : {
    classTwacher: '课程讲师',
    classStatus: '上架状态',
    checkFail: '您提交的资质认证审核不通过，请按照要求重新提交。',
    goCheck: '前往查看',
    duringCheck: '您提交的资质认证资料还在审核中，审核通过后才可获得当前操作权限。我们会尽快处理，请耐心等待！',
    noCheck: '您还未提交资质认证，认证通过后才可获得当前操作权限。',
    noCheck1: '恭喜您，课程已经添加成功！但您还未进行身份认证，课程还未上架，认证通过后才可以上架，赶紧去认证吧！',
    checkFail1: '恭喜您，课程已经添加成功！但您提交的身份认证资料审核不通过，请重新提交资料审核，赶紧去认证吧！',
    duringCheck1: '恭喜您，课程已经添加成功！您提交的身份认证资料正在紧急审核中，审核通过后课程才可上架，请耐心等待！',
    checkNow: '立即认证',
    checkAfter: '稍后认证',
    singleInfo: '1对1课程每节课授课时长默认为25分钟；学员报名后，由学员与讲师预约时间上课，只需要课时大纲，不需要安排具体上课时间',
    smallInfo: '小班课每节课时间为45分钟；报名人数上限为12人',
    largeInfo: '直播课每节课默认时间为45分钟，开班人数上限为100人',
    chooseClass: '选择班型',
    singleList: '1对1课程列表',
    smallList: '小班课课程列表',
    largeList: '直播课课程列表',
    singleInfo1: '1对1课程每节课授课时长为',
    singleInfo2: '分钟；学员报名后，由学员与讲师预约时间上课，只需要课时大纲，不需要安排具体上课时间',
    smallInfo1: '小班课每节课时间为', 
    smallInfo2: '分钟；报名人数上限为',
    smallInfo3: '人',
    largeInfo1: '直播课每节课时间为',
    largeInfo2: '分钟，开班人数上限为',
    largeInfo3: '人',
    // 新增
    teacherInfo: '请先添加老师，再进行操作'
  },
  rest : {
    logout: '退出确认',
    logoutInfo: '确定要退出登录吗？',
    yes: '确定',
    countSet: '帐户设置',
    phone:'手机号',
    validate: '验证码',
    newPwd: '新密码',
    reNewPwd: '确认密码',
    priMobile: '原手机号',
    newMobile: '新手机号',
    uploadImg: '上传头像',
    name: '姓名',
    loginName: '登录名',
    realName:'真实姓名',
    edit: '编辑资料',
    changePwd: '修改密码',
    changeMobile: '修改手机号',
    sendValidate: '发送验证码',
    tip1: '验证码不能为空！',
    tip2: '请输入新密码！',
    tip3: '两次密码不一致！',
    tip4: '姓名不能为空',
    tip5: '请输入原手机号！',
    tip6: '请输入确认密码！',
    tip7: '请输入昵称',
    tip8: '请输入登录名',
    tip9: '登录名可以是数字、字母或者下划线，6-16位',
    tip10: '请输入短信验证码',
    tip11: '短信验证码格式不正确',
    tip12: '请输入密码',
    tip13: '密码只可以是数字、字母或者下划线，6-16位',
    tip14: '请输入账号',
    tip15: '请输入正确的手机号',
    tip16: '重发验证码',
    tip17: '请输入图形验证码',
    tip18: '请输入新密码6-16位，区分大小写，不能用空格',
    tip19: '请输入登录密码',
    tip20: '请输入用户名称',
    unit: '秒',
    forget: '忘记密码',
    regist:'立即注册',
    login: '登录',
  },
  //注册
  regist:{
    organInfo : ' 适用于有资质的教育公司， 可以自主添加多个老师来授课',
    teacherInfo : ' 适用于有教学能力而没有注册公司的个人讲师， 您无法添加其他的老师来授课',
    teacherRegister : ' 个人讲师注册',
    organRegister : ' 机构注册',
    hasAccount : '已有帐号',
    goLogin : '去登录 >>',
  },
  //注册协议
  Agreement: {
    checktip:'我已阅读并同意此协议',
    title: '机构（个体老师）注册协议',
    introduction: '请您务必审慎阅读、充分理解各条款内容，如果您选择接受本条款，即表示您同意接受协议各项条件的约束。如果您不同意本服务条款，则不能获得本协议中规定的各项权利。',

    title1: ' 一、 术语定义 ',
    title1p1: '1、 用户是指合法成立并存续的具有法人主体资格的企业及非企业单位，或者个体教师工作室以团体名义入驻的非法人单位，以下统称为用户。',
    title1p2: '2、 门课网软件、网站及App，以下统称为门课网。',

    title2: ' 二、 账户 ',
    title2p1: '1、注册者资格',
    title2p2: '您确认：您是具备完全民事权利能力和完全民事行为能力的自然人、法人或其他组织，有能力对您使用门课网服务的一切行为独立承担责任。若您不具备前述主体资格，门课网在依据法律规定或本协议约定要求您承担责任时，有权向您的监护人追偿。',
    title2p3: '2、账户的实名认证',
    title2p4: '（1）在您按照注册页面提示填写信息、阅读并同意本服务条款且完成全部注册程序后，门课网要求您完善注册信息并上传能证明您及您所在机构身份的证件照片，门课网会依据法律法规对您或所在机构的真实性进行验证，并以此为依据来确定您是否可以使用门课网的服务。',
    title2p5: '（2）您了解并同意，您在本网站完成的注册程序并注册成功后，您即已获得门课网服务账户。与此同时，您还获得了包括本网站以及后续可能开通的其他网站/服务 （以下合称“门课网”），无需重新注册（部分功能可能要求您在使用上述登录名进行首次登录时进行激活操作）。您在此明确授权，您的账户信息 在您注册成功时，已授权本网站披露给所有门课网各产品使用，以使您更便捷地使用门课网的服务。',
    title2p6: '（3）除非有法律规定或生效法律文书确定，或者符合门课网公布的条件， 否则您不得以任何方式转让、赠与或让他人继承您的门课网账户（与账户相关的财产权益除外）。',
    title2p7: '（4）您了解并同意，为保证账户和交易安全，门课网有权随时要求您更新账户的实名认证；同时，门课网可能会就某些产品或服务的开通，要求您提供更多的身份资料和信息，做进一步的身份认证或资格验证。',

    title3: ' 三、 信息安全',
    title3p1: '1、您须自行负责对您在门课网的账户和密码保密，且须对您在该登录名和密码下发生的所有活动（包括但不限于信息披露、发布信息、网上点击同意或提交各类规则协议、 网上续签协议或购买服务等）承担责任。您同意：',
    title3p2: 'A、如发现任何人未经授权使用您的门课网账户和密码，或发生违反保密规定的任何其他情况，您会立即通知门课网，并授权门课网将该信息同步给门课网网站；',
    title3p3: 'B、确保您在每个上网时段结束时，以正确步骤离开网站。门课网不能也不会对因您未能遵守本款规定而发生的任何损失或损毁负责。您理解门课网对您的请求采取行动需要合理时间，门课网对在采取行动前已经产生的后果（包括但不限于您的任何损失）不承担任何责任。',
    title3p4: '2、 您理解并同意，门课网有权了解您使用本网站产品及服务的真实背景及目的，有权要求您如实提供真实、全面、准确的信息；如果门课网有合理理由怀疑您提供的信息 不真实、您进行虚假交易，或您的行为违反门课网的网站规则的，门课网有权暂时或永久限制您账户下所使用的所有产品及/或服务的部分或全部功能。',
    title3p5: '3、 您理解并同意，门课网有权按照国家司法、行政、军事、安全等机关（包括但不限于公安机关、检察机关、法院、海关、税务机关、安全部门等）的要求对您的个人信息及在本网站的资金、交易及账户等进行查询、冻结或扣划。',
    title3p6: '4、 门课网要求您提供与其个人身份有关的信息资料时，会事先以明确的方式告知您所提供资料的使用场景，并采取必要措施保护您的个人信息资料的安全。未经您许可门课网不得向任何第三方提供、公开或共享您注册资料中的姓名、个人有效身份证件号码、联系方式等个人身份信息，但下列情况除外：',
    title3p7: 'A、您或您的监护人授权门课网披露的；',
    title3p8: 'B、有关法律要求门课网披露的；',
    title3p9: 'C、司法机关或行政机关基于法定程序要求门课网提供的；',
    title3p10: 'D、门课网为了维护自己合法权益而向您提起诉讼或者仲裁时；',
    title3p11: 'E、应您的监护人的合法要求而提供您个人身份信息时。',

    title4: ' 四、 内容规范 ',
    title4p1: '您在使用门课网服务时填写、 登录、 使用的帐号名称、 头像、 个人简介等帐号信息资料以及您在使用直播课堂时的言行举止应遵守法律法规、 社会主义制度、 国家利益、 公民合法权益、 公共秩序、 社会道德风尚和信息真实性等七个原则， 不得在帐号信息资料及直播中出现违法和不良信息， 不得有以下情形:  ',
    title4p2: '1、 违反宪法或法律法规规定的；  ',
    title4p3: '2、 危害国家安全， 泄露国家秘密， 颠覆国家政权， 破坏国家统一的；  ',
    title4p4: '3、 损害国家荣誉和利益的， 损害公共利益的；  ',
    title4p5: '4、 煽动民族仇恨、 民族歧视， 破坏民族团结的；  ',
    title4p6: '5、 破坏国家宗教政策， 宣扬邪教和封建迷信的；  ',
    title4p7: '6、 散布谣言， 扰乱社会秩序， 破坏社会稳定的；  ',
    title4p8: '7、 散布淫秽、 色情、 赌博、 暴力、 凶杀、 恐怖或者教唆犯罪的；  ',
    title4p9: '8、 侮辱或者诽谤他人， 侵害他人合法权益的；  ',
    title4p10: '9、 含有法律、 行政法规禁止的其他内容的。  ',
    title4p11: '若用户信息资料或在直播课堂中存在违法和不良信息的， 门课网有权采取通知限期改正、 暂停使用等措施。 对于冒用关联机构或社会名人登录、 使用、 填写帐号名称、 头像、 个人简介的， 门课网有权取消该帐号在门课网上使用， 并向政府主管部门进行报告。 ',

    title5: ' 五、 免责条款 ',
    title5p1: '基于包括但不限于下列门课网不可控制的原因或并非门课网的过错所造成的损失， 用户应自行承担或向有关责任方追偿：  ',
    title5p2: '1、 不可抗力事件导致的服务中断；  ',
    title5p3: '2、 由于受到计算机病毒、 木马或其他恶意程序、 黑客攻击的破坏等不可抗拒因素可能引起的信息丢失、 泄漏等风险；  ',
    title5p4: '3、 用户的电脑软件、 系统、 硬件和通信线路出现故障或自身操作不当；  ',
    title5p5: '4、 由于网络信号不稳定等原因所引起的登录失败、 资料同步不完整、 页面打开速度慢等；  ',
    title5p6: '5、 用户发布的内容被他人转发、 复制等传播可能带来的风险和责任;  ',
    title5p7: '6、 如因系统维护或升级而需要暂停网络服务， 门课网将事先在网站发布通知；  ',
    title5p8: '7、 其他门课网无法控制的原因。 ',

    title6: ' 六、 服务的变更、 中断、 终止 ',
    title6p1: '1、 您有发布违法信息、 严重违背社会公德、 以及其他违反法律禁止性规定的行为， 门课网有权立即终止对您提供服务。  ',
    title6p2: '2、 您在接受门课网服务时实施违反约定或相关法规的不正当行为的， 门课网有权终止对您提供服务。  ',
    title6p3: '3、 您没有以真实的个人身份信息进行注册， 或实施违反本协议或相关法规的行为， 门课网有权中止对您提供全部或部分服务； 门课网采取中止措施会以合适的方式通知您并告知中止期间， 中止期间是合理的， 中止期间届满门课网应当及时恢复对您的服务。 ',

    title7: ' 七、 适用法律 ',
    title7p1: '1、 本服务条款的解释， 效力及纠纷的解决， 适用于中华人民共和国大陆法律。  ',
    title7p2: '2、 若用户和门课网之间发生任何纠纷或争议， 首先应友好协商解决， 协商不成的， 任一方有权将争议提交门课网所在地北京市朝阳区人民法院诉讼解决。 ',

    title8: ' 八、 协议生效 ',
    title8p1: '1、 本协议自用户注册成功之日起生效。  ',
    title8p2: '2、 门课网在法律许可范围内对本协议拥有最终解释权。 ',
  },
  //使用指南详情
  guild:{
    Chapter1:{
      title:"第一章	产品概述",
      section1:{
        title:"1.1 产品概述",
        text1:"本文档主要是针对机构及个人讲师在门课网上注册、认证及管理课程、老师、学生、财务等功能进行介绍，以方便用户在最短的时间内学生使用",
        code:"门课网",
        text2:"平台",
        text3:"对该文档有最终解释权"
      },
      section2:{
        title:"1.2	注册、登录、以及认证",
        item1:{
          title:"1.2.1 注册",
          sentence1:{
            code:"门课网",
            text1:"允许有资质的",
            keyWord1:"个人讲师",
            text2:"或",
            keyWord2:"机构",
            text3:"注册，个人讲师注册后会对讲师的个人身份证等信息进行验证，审核通过后即可添加课程并授课，但不能添加其他老师授课。",
          },
          sentence2:{
            text:"机构注册后会对机构的营业执照、法人身份等信息进行验证，审核通过后即可自主添加课程及老师，开设班级后即可授课。"
          },
          sentence3:{
            keyWord:"个人讲师与机构的最大区别是：机构可以添加多个老师，而个体讲师不能添加其他老师账号，只可以自己授课。",
            text:"因此，在注册时请根据您的实际需求选择对应的类型。",
          },
          sentence4:{
            text1:"机构及个体老师在注册时，",
            keyWord:"手机号是唯一的身份标识，每个手机号只允许注册一次，",
            text2:"注册后如果需要修改手机号请联系我们的客服人员。"
          },
          sentence5:{
            text:"(1) 在官网上点击我要开课按钮，即可进入机构注册页"
          },
          sentence6:{
            text:"(2) 进入注册页面后，需要选择是机构注册还是个体注册，并需要填写用户名称、登录密码、手机号，然后输入图形验证码和短信验证码点击注册，注册成功之后，即可进入机构后台页面。"
          },
        },
        item2:{
          tiele:"1.2.2 登录",
          sentence1:{
            text1:"在注册成功后即可拥有",
            code:"门课网",
            text2:"的账号，可以在门课网上登录，手机号为唯一登录凭证。输入手机号和密码即可登录。"
          },
          sentence2:{
            text:"如果忘记密码，可在登录页点击忘记密码，来找回密码"
          },
        },
        item3:{
          tiele:"1.2.3 认证",
          sentence1:{
            text1:"为保证用户身份的真实性及对用户行为的跟踪，在",
            code:"门课网",
            text2:"上注册的个人讲师及机构在进行上架课程的操作时需要对您进行身份认证，或者是设置模块进行身份认证。"
          },
          sentence2:{
            text:"认证过程分为三个步骤，首先需要阅读并同意注册协议，然后完善进行身份及资质信息，最后官方审核通过后会以短信方式通知。"
          },
          sentence3:{
            text:"(1) 阅读协议，勾选我已阅读并同意此协议，即可进入下一步"
          },
          sentence4:{
            text:"(2) 提交审核资料，完善身份资质信息"
          },
          sentence5:{
            text:"填写完认证信息，点击提交即可，官方后台会在1~2个工作日内审核，并将审核结果以短信方式通知您。"
          },
        },
      }
    },
    Chapter2:{
      title:"第二章	 首页",
      section1:{
        title:"2.1 系统首页",
        text1:"系统首页为统计功能，您可以在首页查看本机构的交易情况、班级、学生以及课时情况",
      },
      section2:{
        title:"2.2 机构课表",
        text1:"我们将您机构下的课表以日历的方式呈现，您可以清晰地看到机构下每天的课程安排，并可以查看这些课程的详细信息。",
        text2:"如果您是个人讲师注册，您可以从机构课表中选择对应日期下的对应课时，到达上课时间时可直接进入直播教室上课。",
        text3:"而您如果是机构注册，在机构课表中同样可以进入教室以管理员的身份进行巡课，您的老师也能在教师端进入教室上课。"
      },
    },
    Chapter3:{
      title:"第三章	课程管理",
      section1:{
        title:"3.1 课程管理",
        text1:"(1) 点击左上角的添加按钮，即可根据提示完成添加课程的操作。",
        text2:"(2) 第一步，选择所要开设的班型，我们允许您开设1对1、小班课、直播课三种班型。1对1班型需要老师先设置可预约的空闲时间，开设1对1班级后，学生可以根据自己的需求预约老师的空闲时间上课。而小班课和直播课的上课时间都是由机构或老师指定，小班课更适合于老师和学生有较多音视频交互的课程，直播课更适合于由老师单向输出的公开课。",
        text3:"您可以根据课程内容的不同开设不同的班级，也可以为每一门课程开设多个不同班型、不同时间、不同授课老师的班级。",
        text4:"(3) 第二步，填写课程的基本信息，包括课程分类、课程名称、课程副标题、以及课程概述，并上传课程封面。",
        text5:"(4) 第三步，填写班级的课时信息，填写班级的课程单元、课时、以及关联课件，如果是小班课和直播课还需要填写上课的具体时间，如果是1对1的课程，则只填写课程单元、课时、关联课件，不需要填写上课的具体时间。",
        text6:"增加课程单元",
        text7:"增加课时，上传课件",
        text8:"(4) 第四步，设置课程的价格，点击保存，即可将课程保存至课程列表。",
        text9:"(5) 课程编辑完成之后，如果您已经进行了身份认证，小班课和直播课，默认为上架状态，1对1课程，默认为招生状态；如果暂时未进行身份认证，则为下架状态和暂停招生状态，请您先进行认证操作（详见1.2.2），再进行课程上架以及招生的操作。",
        text10:"课程上架后，只能进行下架操作，如果想对课程进行编辑或者删除，请先将课程下架。",
      },
      section2:{
        title:"3.2 课件管理",
        text1:"无论您是个人讲师还是机构，老师通过网络授课时必然会使用大量的课件，这些课件我们允许您提前上传到平台上，并且在添加课程的时候将课程关联到对应的课时上。",
        text2:"您或您的老师在上课的时候，关联的课件会直接上传到直播教室中，这样您或您的老师在上课时就可以直接使用课件了。",
        text3:"我们允许您或您的老师创建属于自己的文件夹，并在文件夹中上传课件，为保证课件的安全，机构管理员可以删除机构下所有的课件，而机构下的老师只能删除自己上传的课件。",
        sentence:{
          text1:"我们支持多种常用格式的课件，比如",
          keyWord:"Excel、Word、PPT、PDF、TXT、MP3、MP4",
          text2:"及各种类型的图片，可以满足您的需求。"
        },
        text4:"点击文件夹，可查看该文件夹下的所有课件，并进行上传课件，查看课件和删除课件等操作。",
      },
      section3:{
        title:"3.3 上课管理",
        sentence1:{
          code:"门课网",
          text:"使用的是拓课云提供的互动直播服务，老师和学生从自己的课表中进入直播教室即可开始上课。"
        },
        sentence2:{
          text:"但是，请您规范使用直播平台，",
          keyWord:"如果您在直播时发布不符合法律法规的内容，我们会及时中断您的直播并永远禁用您的账号。"
        },
        text:"拓课云提供优质的视音频交互直播服务，低延迟、无卡顿，真实还原线下教学场景，让老师和学生面对面。同时，在直播教室中，拓课云提供多种样式的交互服务，老师可以给学生发送奖杯，课堂所有人员可以以文字方式进行沟通。",
      }
    },
    Chapter4:{
      title:"第四章	用户管理",
      section1:{
        title:"4.1 老师管理",
        item1:{
          title:"4.1.1 添加讲师",
          text1:"如果您是个人讲师注册，您将无法添加其他老师授课，只能自己授课。如果您是机构注册，可以通过手机号或者发送链接邀请老师加入机构。",
          text2:"(1) 点击添加老师，输入老师手机号，如果该位老师已经拥有门课网账号，则点击邀请后，将会给老师发送邀请，等待老师同意即可，如下图所示；",
          text3:"(2) 如果该位老师没有门课网账号，输入老师手机号后，会生成邀请注册链接，直接让老师通过微信、QQ扫码或者链接注册即可成为机构下的老师。"
        },
        item2:{
          tiele:"4.1.2 讲师管理",
          text1:"讲师加入机构后，您可以对讲师的账号进行禁用或者启用的操作；只有在账号启用状态下，该讲师才能登录教师端进行操作；也可以进行解绑操作。但是需要提醒您的是，您只能在该老师的课程全部完成之后，才能对老师进行解绑操作。",
          text2:"您还可以对机构下讲师的1对1可预约时间进行设置，只有设置了1对1讲师的可预约时间，才可对该位讲师开设1对1的课程。"
        },
      },
      section2:{
        title:"4.2 学生管理",
        text:"学生是在您的网站上通过手机号注册的，您在后台可以查看报名本机构课程的学生的基本信息。"
      }
    },
    Chapter5:{
      title:"第五章 财务管理",
      section1:{
        title:"5.1 订单管理",
        text:"您可以查看所有购买您课程的学生订单，包括已支付、待付款和已取消的订单，并且可以查看每个订单的详情。"
      },
      section2:{
        title:"5.2 账户明细",
        text1:"为保障学生的权益，学生在买课时所支付的费用并没有直接支付到您的账户上，我们会在学生购买的课程上完会将费用结算到您的账户中。",
        text2:"在后台您可以查看已经结算到您账户中的金额及明细，也可以查看学生已经支付但未结算到您账户中的金额，我们绝对保障您资金的安全。",
        sentence1:{
          text:"您账户中有余额时，您可以随时发起提现申请，申请将账户中的钱提现到您的支付宝账户中，我们会很快处理您的申请并将钱转到您的支付宝账户。",
          keyWord:"如果您是个人讲师注册，在发起提现申请时，您所填写的支付宝账号必须是您认证时填写的认证人名下的账户。"
        },
        sentence2:{
          keyWord:"如果您是机构注册，填写的支付宝账号必须是您认证时填写机构名称所对应的对公支付宝账号，",
          text:"我们在转账时会进行一致性验证，如果两个信息不一致，会导致提现失败。"
        }
      },
      section3:{
        title:"5.3 提现明细",
        sentence:{
          text:"您发起的提现申请可能会因为某些原因导致不成功，一般情况下都是因为所填写的支付宝账号与认证时填写身份信息不一致。",
          keyWord:"如果提现失败也请您不用担心，我们会将钱返还到您的账户余额中，再次发起提现申请即可。"
        },
      },
      section4:{
        title:"5.4 对账中心",
        text:"对账中心是为了方便您查看您机构下每个老师在一定阶段内的产出，您可以输入起始时间来筛选某一段时间内老师创造的价值，也可以输入老师的姓名检索，查看该老师创造的价值。"
      },
    },
    hint:"以上为门课网机构端的使用指南，希望能对您有所帮助，如果您在使用门课网时遇到问题，可与我们的客服人员联系。",
    tel:"联系电话：086-010-84918242",
    email:"邮箱：support@51menke.com"
  },
  fastClass:{
    des: '恭喜您成功注册门课网，是不是还不知道怎么开课呢？赶紧体验一下吧',
    addInfo1: '添加课程基本信息',
    addInfo2: '完成设置',
    studentUrl: '课程链接',
    contentArr1: '1.	根据课程内容选择合适的课程分类，课程添加完成后会显示在门课网对应的分类下，学生可以根据分类找到课程；<br/>2.	课程封页、标题、副标题及简介是学生了解课程最关键的数据，请根据您课程特点填写对应的内容，以便学生以最快最直接的方式了解课程的内容。',
    contentArr2: '1.	选择教授该课程的老师，一门课程只能由一个老师授课；<br/>2.	填写课程的单元课时内容，并为每个课时关联课件，设置每一节课的授课时间。这些内容会显示在课程详情页，学生会根据自己的空闲时间选择所购买的课程。',
    contentArr3: '1.	课程信息填写完成后会显示在门课网的网站上，您有权控制课程的上架、下架；学生在官网上购买课程后即可开始上课；<br/>2.	在添加课程时您需要设置课程的售价，售价为多少均由您决定。',
    btn1: '暂不体验',
    btn2: '立即体验',
    btn3:'快速体验',
  }
};
