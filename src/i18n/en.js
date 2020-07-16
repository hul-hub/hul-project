export default {
  main: {
    // 导航
    home: {
      name: 'home page ', //首页
      subMenu: {
        indexpage: 'system homepage', //系统首页
        courseTable: 'agency schedual', //机构课表
        courseTable2: 'my schedual',//我的课表
      }
    },
    cropper: {
      Upload: 'Upload Image',
      ImgError: 'Incorrect file format',
      ImgBig: 'Image size cannot exceed 1M',
      ImgInfo: 'Image information',
      width: 'Width',
      height: 'Height',
      chooseImg: 'Select Image',
      uploadAvatar: 'Upload',   
      UploadSuccess: 'sucessful upload',
      UploadFaild: 'upload failed'
    },
    courseManage: {
      name: 'course management ', //课程管理
      subMenu: {
        materialManage: 'courseware management', //课件管理
        courseManage: 'course management ', //课程管理
      }
    },
    userManage: {
      name: 'user management', //用户管理
      subMenu: {
        teacherManage: 'teater management', //老师管理
        studentManage: 'student management' //学生管理
      }
    },
    orderManage: {
      name: 'order management', //订单管理
      subMenu: {
        allOrder: 'all orders', //全部订单
        accountDetails: 'account details', //账户明细
        withdrawalSubsidiary: 'cash withdrawal details', //提现明细
        checkCenter: 'reconcilation center' //对账中心
      }
    },
    setting: {
      name: 'settings', //设置
      subMenu: {
        authenticationInformation: 'authentication information', //认证信息
      }
    },
    operatingguide: 'operating guide' //使用指南
  },
  Common: {
    web: 'Course Website', //51门课网
    web2: 'Corporate management background',
    symbol: '￥',//￥
    fisrtpage: 'home page ', //首页
    trailerpage: 'trailer page', //尾页
    previouspage: 'previous page', //上一页
    nextpage: 'next page', //下一页
    nodata: ' no data', //暂无数据
    kindlyreminder: 'warm prompt', //温馨提示
    submit: 'submit', //提交
    cancel: 'cencel', //取消
    sure: 'confirm', //确认
    watch: 'check', //查看
    set: 'settings', //设置
    edit: 'edit', //编辑
    delete: 'delete', //删除
    save: 'save', //保存
    mark: 'operate', //操作
    nextstep: 'next step', //下一步
    prevstep: 'last step', //上一步
    goCheck: 'go to view', //前往查看
    checkNow: 'certificate immediately', //立即认证
    checkAfter: 'certificate later', //稍后认证
    know: 'got it', //知道了
    single: 'one-on-one', //1对1
    samll: 'small class', //小班课
    large: 'live class', //直播课
    addlesson: 'Increase class hours', //增加课时
    addfile: 'Associate courseware', //关联课件
    addtime: 'select time', //选择时间
    colon: ':',//:
    NO: 'no', //无
  },
  webInfo: {
    bak: 'Copyright Course Website Beijing ICP Number 17018423-2'
  },
  // 首页
  homepage: {
    indexpage: 'system homepage', //系统首页
    accountinformation: 'account information', //账户信息
    Thelogin: 'the login', //本次登录
    quit: 'drop out', //退出
    amountTrade: 'total transaction amount', //交易总额
    transactionOrders: 'number of transaction order', //成交订单数
    totalStudents: 'total number of students', //学生总数
    totalTeachers: 'total number of teachers', //老师总数
    institutionsOverview: 'class overview', //班级总览
    studentsoverview: 'student overview', //学生总览
    statisticsofClassHoursAndStudents: 'statistics for class hours and the number of students',//课时数及学生数统计
    statisticsOfClassHoursinDifferentTimePeriodsToday: "statistics for today's class hours ", //今日各时间阶段课时数统计
    todayNew: 'the increased today', //今日新增
    yesterdayNew: 'the increased yesterday', //昨日新增
    monthincrease: 'the increased this month', //本月增加
    admissionclass: 'the class in the enrollment', //在招生班级
    today: 'today', //今日
    week: 'this week', //本周
    month: 'this month', //本月
    total: 'total amount', //总金额
    order: 'number of orders', //订单数
    classhour: 'class hours', //课时数
    Numberstudents: ' number of students', //学生数
    salesstatistics: 'sales statistics', //销售统计
    Transactionflowstatistics: 'transaction flow statistics', //交易流水统计
    Salesstatisticsinrecentdays: 'Nearly 7 days sales statistics', //近7天销售统计
    Nearly7days: 'nearly 7 days', //近7天
    Nearly30days: 'nearly 30 days', //近30天
    goBack: 'back to homepage', //返回首页
  },
  //机构课表
  courseTablepage: {
    courseTablepage: 'agency schedual', //机构课表
    Monday: 'Monday', //周一
    Tuesday: 'Tuseday', //周二
    Wednesday: 'Wednesday', //周三
    Thursday: 'Thursday', //周四
    Friday: 'Friday', //周五
    Saturday: 'Saturday', //周六
    Weekday: 'Sunday', //周日
    Atotalofclass: 'classes in total', //共节课
    status1: 'over',//已结束
    status2: 'waiting for class',//待上课
    status3: 'not attending class',//未上课
  },
  //机构课表-课程课表
  calendarSchedule: {
    subtitle: 'curriculum schedule', //'课程列表',
    enclass: 'enter the classroom', //'进教室',
    enclass2: 'Class Patrolling', //巡课
    notStarted: 'not start', //'未开始',
    starttime: 'starring time', //'开始时间',
    endtime: 'finishing time', //'结束时间',
    periodname: 'class name ', //'班级名称',
    classtype: 'class type', //'班型',
    teacher: 'teacher', //'老师',
  },
  //机构课表-课程课表-课表详情
  LessonDetail: {
    subtitle: 'course details', //'课程详情',
    periodtitle: 'course details', //'课时详情',
    curriculum: 'course introduction', //'课程简介',
    coursetitle: 'course title', //'课程名称',
    Courseware: 'courseware list', //'课件列表',
    addCourseware: 'add courseware', //'添加课件',
    student: 'student list', //'学生列表',
    total: 'people in total', //'共*人',
    replay: 'course playback', //'课程回放',
    replaytip: 'course playback in production', //'课程回放制作中',
    info: 'Section', //'第*片段',
    comment: 'comment list', //'评论列表',
    commentnum: 'number of comments', //'评论数量',
    unit: 'score',//'*分'
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
  materialManagepage: {
    materialManagepage: 'courseware management', //课件管理
    folder: 'folder', //文件夹
    newfolder: 'new folder', //新建文件夹
    Temporaryfolder: 'no folder yet', //暂无文件夹
    size: 'size', //大小
    uploading: 'upload', //
    uploadFile: 'Upload material',
    chooseFile: 'Select upload courseware',
    name: 'title', //
    remind1: 'There are multiple files under this folder. Deleting the folder will cause the files under the folder to be deleted. Are you sure you want to delete them?', //该文件夹下有多个文件，删除文件夹会导致文件夹下的文件也被删除，您确定要删除吗？
    remind2: 'Are you sure you want to delete this folder?', //您确定要删除该文件夹吗？
    remind3: 'Deleting this file will cause the course that has been associated with the file to be unviewable. Are you sure you want to delete it?', //删除该文件后，会导致已经关联该文件的课程无法查看，您确定要删除吗？
    remind4: 'file upload failed', //文件上传失败
    remind5: 'incorrect file format ', //文件格式不正确
    remind6: 'file too large ', //文件过大
    remind7: 'Are you sure you want to delete this courseware?', //确认删除此课件吗？
    success: 'sucessful upload', //上传成功
    entersearch: 'input search', //输入搜索
    Namecourseware: 'courseware name', //课件名称
    Nameclass: 'course title', //课程名称
    addtime: 'add time', //添加时间
    unit: 'the number of', //个
    tip1: "You can upload courseware in advance, and associate courseware when you set up a classroom or course.Entering the live classroom, the courseware is automatically linked to the classroom, so you don't need to upload it again.",
    tip2: "We support courseware in a variety of formats, such as ( * .xls;*.xlsx;*.ppt;*.pptx;*.doc;*.docx;*.txt;*.pdf;*.jpg;*.gif; *.jpeg;*.png;*.bmp;*.mp3;*.mp4), a single courseware being required not to exceed 100M;",
    tip3: 'please enter the name', //请输入名称
  },
  symbol: {
    colon: '：',
  },
  //课程管理 -课程管理
  courseManagepage: {
    courseManage: 'course management ', //课程管理
    courseInfo: 'course information ', //课程信息
    allcourses: 'all courses', //全部课程
    on: 'on sales', //已上架
    Noton: 'not on sale', //未上架
    coursetitle: 'course title', //课程名称
    coursetime: 'course information ', //课时信息
    addcoursetime: 'new course unit', //新增课程单元
    inputkeywords: 'enter keywords ', //输入关键字
    Coursescoverpage: 'course cover', //课程封页
    basicprice: 'base price', //基础价
    Onofftheshelves: 'on sale/ not on sale', //上/下架
    operation: 'operate', //操作
    Addcourse: 'add class', //添加课程
    time: ' class hours', //课时
    editcourse: 'edit course information', //编辑课程信息
    remind1: 'Are you sure you want to delete?', //你确定要删除吗？
    remind2: 'You have not added a category yet, unable to add a class.', //您还未添加分类，暂时无法添加课程。
    Coursespage: 'course cover', //课程封页
    addclassmeg: 'Fill in the course ', //填写课程信息
    addclasstime: 'fill in the class hours', //填写课时信息
    basicinformation: 'basic information', //基本信息
    lessoncourse: 'course classification', //课程分类
    courseoverview: 'course overview', //课程概述
    courseclassification: 'select course level', //选择课程分类
    subtitle: 'subtitle', //副标题
    firstclassification: 'advanced level', //一级分类
    secondclassification: 'secondary level', //二级分类
    thirdclassification: 'primary level ', //三级分类
    remind1: 'To ensure that the cover of the course is displayed,please upload an image with a size of 816 * 490 pixels', //为保证课程封面显示效果，请上传尺寸为816 * 432像素的图片
    remind2: 'The course name should not exceed 20 Chinese characters，supporting Chinese and English input.', //课程名称长度不超过20个汉字，支持中英文输入
    remind3: 'The subtitle, a brief introduction of the course, is no more than 100 Chinese characters, supporting Chinese and English input.', //副标题是该可课程的一句话介绍，长度不超过100个汉字，支持中英文输入
    remind4: 'The course overview, a detailed introduction of the course, including the course structure, course content and teaching objectives, supporting the input both Chinese and English.', //课程概述为该门课程的详细介绍，包括课程结构、课程内容、教学目标等，支持中英文输入
    remind5: 'Course cover cannot be empty!!', //课程封页不能为空!
    remind6: 'Course name cannot be empty!!', //课程名字不能为空!
    remind7: 'Subtitles cannot be empty!', //副标题不能为空！
    remind8: 'The course overview cannot be empty!!', //课程概述不能为空!
    remind9: 'Please select a course level!', //请选择课程分类！
    remind11: 'Select the class type, allowing multiple choices', //选择该课程允许开设班级的类型，允许多选
    prompt: 'Please enter the unit name', //请输入单元名称
    prompt2: 'Please enter session name', //请输入课时名称
    prompt3: 'Please enter classhour', //请输入课时数
    save: 'save', //保存
    nextstep: 'next step', //下一步
    Associatedtext: 'associate tezxtbook', //关联课本
    Unitnumber: 'number of units', //单元数
    Classnumber: 'class hours', //课时数
    baseprice: 'base price', //基础价格
    money: 'Yuan', //元
    enterbase: 'enter the course price', //输入课程价格
    classtype: 'class type', //开班类型
    all: 'all', //全部
    on: 'on sale', //上架
    success: 'done', //完成
    buyNum: 'Purchased times', //已购买次数
    unit: 'times', //*次
    tip6: 'unit', //第*单元
    tip7: 'class hour', //共*个课时
    AllEvaluation: 'All evaluation', //全部评价
    noSelectTime: '(No appointment time is set)', //（未设置可预约时间）
    scheduling: 'Class scheduling', //排课
    startTime: 'Course dates', //上课日期
    classTime: 'class time', //上课时间
    tip01: 'Unit name', //单元名称
    tip02: 'Class name', //课时名称
    tip1: 'Unit name cannot be empty', //单元名称不能为空
    tip2: 'Class name cannot be empty', //课时名称不能为空
    tip3: 'Please choose the teacher', //请选择授课老师
    tip4: 'The teacher has not set the appointment time for one-on-one class and can not launch classes', //该老师未设置1对1可预约时间，不能开课
    tip5: 'course price cannot be empty', //课程价格不能为空
    tip6: '请将该地址分享给您的学生：',//请将该地址分享给您的学生：
    tip7: '学生可以点击该链接查看您添加的课程详细内容；',//学生可以点击该链接查看您添加的课程详细内容；
    tip8: '学生可以在打开的页面上点击进教室按钮直接进入直播教室；',//学生可以在打开的页面上点击进教室按钮直接进入直播教室；
    tip9: '您可以点击当前页面“进教室”按钮进入直播教室给学生授课。', //您可以点击当前页面“进教室”按钮进入直播教室给学生授课。

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
    duration: '时长',
    coursewareName: '课件',
    periodPrice: '课时单价',
    addtip1: '请输入课时单价',
    addtip2: '课时将于',
    addtip3: '分结束',
    addtip4: '请输入课时单价',
    addtip5: '请输入2-50区间的整数',
    addtip6: '请选择上课频次',
    classhourtime: '课时时长',
    batchBtn: '批量排课',
    frequency: '上课频次',

  },
  //课程管理 -排课管理
  arrangManage: {
    arrangManage: 'course management', //排课管理
    11: 'one-on-one', //1对1
    classname: 'class name ', //班级名称
    oneclass: '1-on-1 lessons', //1对1课程
    privateclass: 'small class', //小班课
    livelesson: 'live class', //直播课
    serial: 'number', //编号
    total: 'total price', //总价
    classtotal: 'course price', //课程价格
    classstatus: 'class status', //班级状态
    totalnum: 'Total number of registrations',//总报名数
    numberregistration: 'Total number of registrations', //总报名数
    Whethertheadmissions: 'wether to enroll', //是否招生
    opening: 'establish a class', //开班
    know: 'got it', //知道了
    remind1: 'Confirm to delete the course?', //确认删除该课程么
    remind2: 'Are you sure you want to enable enrollment?', //您确认要启用招生吗？
    remind3: 'After suspending admission, students will not be able to enroll in the class. Are you sure you want to suspend the enrollment?', //暂停招生后学生就无法报名该班级，您确认要暂停招生吗？
    remind4: "You can't establish a class since you haven't added a class yet .", //您还未添加课程，暂时无法开设班级。
    enableadmissions: 'Enable enrollment', //启用招生
    Suspensionadmissions: 'Suspend enrollment', //暂停招生
    remind5: 'This class has already been registered and cannot be operated.', //该课已有人报名，不能进行操作
    remind6: 'The course is in the process of enrollment and cannot be operated', //该课程正在招生中，不能进行操作
  },
  //用户管理 -老师管理
  teacherManagepage: {
    teacherManagepage: 'teater management', //老师管理
    teachername: "teacher's name", //老师姓名
    teacherphone: 'cell phone number', //手机号码
    serial: 'number', //编号
    total: 'total price', //总价
    numberregistration: 'Total number of registrations', //总报名数
    Whethertheadmissions: 'wether to enroll', //是否招生
    // resetpasswords:'重置密码',//
    teachertel: 'Please enter phone number', //请输入手机号
    addteacher: 'add teacher', //添加老师
    enterteachername: "Please enter  teacher's nickname", //请输入老师昵称
    enterteachertel: 'Please enter phone number', //请输入手机号码
    remind1: 'After deleting the teacher, all the courses offered by the teacher will stop enrolling students. Are you sure you want to delete the teacher?', //删除老师后，该老师所开设的课程将全部停止招生，您确定要删除该老师吗？
    teacherid: 'Teacher ID', //老师ID
    teachernickname: "Teacher's nickname", //老师昵称
    loginAcount: 'login account', //登录帐号
    copyBtnText: 'copy Link', //复制链接
    copiedBtnText: 'Copied', //已复制
    InviteMembers: 'Invite members', //邀请成员
    InviteMembersText: 'Scan QR code or share the link to invite members', //扫描二维码或分享链接邀请成员
    AddTeacherTip1: '1. The Course Website allows  agencies to invite teachers to join by mobile phone number;',
    AddTeacherTip2: '2. If the teacher you invited have not registered on the website, the system will generate a QR code and link. You can send the link and QR code to the teacher,who can open the QR code with the QQ or WeChat or open the link with a browser to register as a teacher of your agency;',
    AddTeacherTip3: '3. If the teacher you invited has already registered on the website, the system will automatically send an invitation message to the teacher. After logging in and agreeing to the invitation, the teacher can join your agency to teach;',
    AddTeacherTip4: '4. You can take the initiative to dismiss the relationship with the teacher. The teacher can also initiate the application and get rid of it with your consent.',
    AddTeacherTip5: "5. To ensure the rights and interests of your agency and the students, please ensure that the teacher's course is completely disbursed before disassociation.",
  },
  //用户管理 -老师管理-老师详情
  teacherDetails: {
    teacherDetails: 'details of the teacher', //老师详情
    unknow: 'Confidentiality', //保密
    unknow2: 'unknown', //未知
    male: 'male', //男
    female: 'female', //女
    Enable: 'enable', //启用
    Disable: 'disable', //禁用
    title: '1-on-1 class appointment time for the teacher', //老师1对1课预约时间
    checkAll: 'select all', //全选
    userID: 'user ID', //用户ID
    birth: 'birthday', //生日
    accountstatus: 'account status', //账户状态
    addtime: 'jioning time', //加入时间
    area: 'location', //所在地
    profile: 'Personal profile', //个人简介
  },
  //用户管理 -老师管理-老师详情--编辑资料
  teacherEdit: {
    teacherEdit: 'edit information', //编辑资料
    logo: "teacher's avatar", //老师头像
    nickname: 'nickname',//昵称
    sex: 'gender', //性别
    profile: "Teacher's profile", //老师简介
    password: 'new password', //新密码
    repassword: 'confirm password', //确认密码
    prphone: 'Original phone number', //原手机号
    newmobile: 'New phone number', //新手机号
    code: 'Verification code', //验证码
    tip1: '(Image format supports jpg, png)', //（图片格式支持jpg、png）
    tip2: "(Students can only see teacher's nickname not the name which can be seen by teachers and administrators.)", //（老师姓名只有老师和管理员能看到，学生只能看到昵称）
    tip3: 'Please select a date', //请选择日期
    tip4: '(The teacher profile should not exceed 100 Chinese characters，supporting Chinese and English input)', //（老师简介不超过300个汉字，支持中英文输入）
    tip5: '(6 to 16 digits, support for numbers, letters and underscores)', //（6～16位，支持数字、字母、下划线）
    AddProfile: '该老师很懒，还未填写个人简介...',
    AddProfile2: '该学生很懒，还未填写个人简介...',
  },
  //用户管理 -学生管理
  studentManagepage: {
    studentManagepage: 'student management', //学生管理
    useraccount: 'user account', //用户账号
    userID: 'user ID', //用户ID
    nickname: 'user nickname', //用户昵称
    Recently: 'recent login', //最近登录
    sex: 'gender', //性别
    Accountactivationstatus: 'Account activation status', //账户启用状态
    tip: 'Please enter the correct account format', //请输入正确的账号格式
  },
  //用户管理 -学生管理 - 学生详情
  studentDetails: {
    studentDetails: 'details of the student', //学生详情
    title: 'course purchased', //已购课程
    logintime: 'recent login time', //最近登录时间
  },
  //订单管理 - 全部订单
  orderList: {
    orderList: 'all orders', //全部订单
    status1: 'all',//全部
    status2: 'pending payment', //待付款
    status3: 'cancelled', //已取消
    status4: 'paid', //已支付
    status5: 'order placed', //已下单
    status6: 'request a refund', //申请退款
    status7: 'refunded', //已退款
    status8: 'refund refusal', //退款驳回
    payway: 'payment method', //支付方式
    paytype1: 'other', //其他
    paytype2: 'Balance', //余额
    paytype3: 'wechat', //微信
    paytype4: 'Alipay', //支付宝
    paytype5: 'UnionPay', //银联
    tip: 'enter order number', //输入订单号
  },
  //订单管理 - 全部订单 - 订单详情
  orderDetails: {
    orderDetails: 'enter order number', //订单详情
    orderinfo: 'order information', //订单信息
    webtype: 'order channel', //下单渠道
    originprice: 'Original price of the course', //原课程总价
    discount: 'Discounted price', //优惠金额
    amount: 'transaction amount', //交易金额
  },
  //订单管理 - 账户明细
  orderManagepage: {
    orderManagepage: 'account details', //账户明细
    withdrawalsubsidiary: 'cash withdrawal details', //提现明细
    availablebalance: 'Available Balance', //可用余额
    Amountsettled: 'Pending amount', //待结算金额
    withdrawdeposit: 'cash withdrawal', //提现
    Withdrawalamount: 'Cash withdrawal amount', //可提现金额
    enterWithdrawalamount: 'Please enter the cash withdrawl amount', //请输入提现金额
    enterWithdrawalamount2: '请输入正确的提现金额', //请输入正确的提现金额
    Withdrawalto: 'withdraw to', //提现到
    Payment: 'Collection platform', //收款平台
    Paytreasure: 'Alipay', //支付宝
    Paytreasurename: 'Alipay account', //支付宝帐户
    enterPaytreasurename: 'Please enter an Alipay account', //请输入支付宝帐户
    Paytreasurename2: 'Paypal account',
    enterPaytreasurename2: 'Please enter a paypal account',
    settled: 'settled', //已结算
    Forthe: 'Pending settlement', //待结算
    student: 'student', //v学生
    payname: 'Collection name', //v收款姓名
    lecturer: 'Instructor', //授课老师
    reference: 'Order number', //订单编号
    amount: 'order amount', //订单金额
    settlement: 'Settlement time', //结算时间
    orderstatus: 'order status', //订单状态
    ordertime: 'order time', //下单时间
    type: 'type', //类型
    a: 'In order to protect the rights of the students, only when the courses purchased by the students are all over, the fees paid by the students for the course will be settled to the account balance.', //为保障学员的权益，只有当学生所购买的课程全部结束后，学生购买该课程所支付的费用才会结算到您的账户余额
    b: "After you agree to the student's refund request, the refunded amount will be returned from the original order,the remaining amount  automatically settled to your account balance;", //您同意学员的退款申请后，所退金额会从原订单中返还，剩余金额自动结算到您的账户余额；
    c: "Your account balance can be withdrawn to Alipay or WeChat. If you are a personal lecturer, you can only withdraw it to the Alipay or WeChat account under your ID card you filled in when you signed your real name certificate. If you are an agency, you can only withdraw it to the Alipay  and Wechat undre the public account of it.", //您的账户余额可以提现到支付宝或微信，如果您是个人讲师，只能提现到您实名认证时填写的身份证名下的支付宝或微信账户；如果您是机构，则只能提现到机构所对应的支付宝对公账户或微信对公账户下；
    d: 'In order to ensure the safety of funds, there will be manual review after the withdrawal of the application, so the withdrawal will be delayed, usually no more than 7 working days.', //为保障资金安全，提现申请后会有人工审核，因此会延迟到账，一般不超过7个工作日。
    status: 'accounted', //已入帐
  },
  //订单管理 - 提现明细
  withdrawalSubsidiarypage: {
    withdrawal: 'Withdrawal application', //提现申请
    succeed: 'approved', //成功
    defeated: 'failed', //v
    week: 'a week', //一周
    month: 'a month', //一个月
    threemonth: 'three months', //三个月
    Transactionnumber: 'Transaction number', //交易编号
    ApplicationDate: 'application time ', //申请时间
    money: 'amount', //金额
    Paymentplatform: 'Collection platform', //收款平台
    shroffaccountnumber: 'Collection account', //收款账号
    processingtime: 'processing time', //处理时间
    state: 'status', //状态
  },
  //订单管理 - 对账中心
  withdrawalcheckCenterpage: {
    withdrawalcheckCenterpage: 'Reconciliation center', //对帐中心
    time: 'time', //时间
    choosetime: 'select a date', //选择日期
    reset: 'reset', //重置
    search: 'search', //搜索
    ApplicationDate: 'login name', //登录名
    nick: 'nickname', //昵称
    Paymentplatform: 'cell phone number', //手机号
    shroffaccountnumber: 'Number of completed orders', //完成订单数
    processingtime: 'income', //收入
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
  authenticationInformationpage: {
    title: 'authentication information', //认证信息
    readagreement: 'Read agreement', //阅读协议
    materials: 'Submit application materials', //提交申请材料
    audit: 'entering review', //入驻审核
  },
  //设置 - 认证信息 -审核状态
  ReviewResult: {
    ReviewResult: 'review status', //审核状态
    tip1: 'You have successfully settled in!', //您已经成功入驻！
    tip2: 'You have successfully submitted your application and we will complete the review within 1-2 business days.', //您已经成功提交入驻申请，我们会在1~2个工作日内完成审核，
    tip3: 'The results of the review will be notified by SMS, please check it out!', //您提交的申请材料审核不通过，请修改后重新提交！
    tip4: 'The application materials submitted have not been approved. Please resubmit after modification!', //审核结果会以短信方式告知，请注意查收
    reason: 'reason', //原因
  },
  //设置 - 认证信息 - 资料认证查看
  showBasicInfo: {
    showBasicInfo: 'check data certification', //资料认证查看
    BasicInfo: 'basic information', //基本信息
    contactname: 'Contact name', //联系人姓名
    contactphone: 'phone number', //电话号码
    contactemail: 'Contact email', //联系邮箱
    organname: 'Business name', //经营名
    summary: 'overview', //概述
    logo: 'Logo', //Logo
    phone: 'Customer service hotline', //客服热线
    email: 'Customer service email cannot be empty', //客服邮箱
    domain: 'domain name', //域名
    des1: '(The name used for display and dissemination on the Course Network, within 12 characters)', //（在门课网上用以展示和传播的名称，12字以内）
    des2: '(Summary of the advantages and characteristics of your class, which helps to facilitate users to get an intuitive impression, within 100 words)', //（简要介绍自己课堂的优势、特色信息，方便用户获得直观印象，100字内）
    des3: '(The logo used to display and spread on the Course Network, with the picture size of 233*159 pixels.)', //（在门课网上用以展示和传播的logo，图片尺寸233*159像素。）
    des4: '(The URL of the homepage of the class can not be modified once it is added. For example, if the domain name is abc, the address of the homepage of the class is http://abc.51menke.com)', //（课堂首页的网址，一旦添加便不可修改，比如填写的域名是abc,则课堂首页的地址为http://abc.51menke.com）
    des5: '(Fill in the name of the certifier to perform the content service)', //（填写要进行内容服务的认证人姓名）
    des6: "( fill in the People's Republic of China ID number in the  valid preriod)", //（请填写中华人民共和国身份证号码（需在有效期内））
    des7: '(ensure the ID card name and ID card number to be clearly visible. The file size is less than 20M)', //（请保证身份证姓名、身份证号码清晰可见。文件小于20M）
    des8: '(fill in the name of the company/institution/school)', //（填写企业/机构/学校的名称）
    des9: '(Please keep the same as the registration number on the business license or the unified social credit code for the three certificates. If it is a school, fill in the corresponding school license number)', //（请和营业执照上注册号码保持一致或三证合一统一社会信用代码，若为学校，则填写相应的办学许可证号）
    des10: '(Please note that the information is visible and the application time is within the valid range. The file is less than 20M)', //（请注意保持各项信息可见，且申请时间在有效范围之内。文件小于20M）
    tip: 'Please enter content', //请输入内容

  },
  //设置 - 认证信息 - 提交申请材料
  editBasicInfo: {
    identity: 'Identity qualification', //身份资质
    idname: "Authenticator's name", //认证人姓名
    idnum: 'ID number', //身份证号码
    frontphoto: 'Front photo of hand-held ID card', //手持身份证正面照
    backphoto: 'Back photo of hand-held ID card', //手持身份证背面照
    organname: 'Company Name', //企业名称
    organnum: 'Business license number', //营业执照号码
    organphoto: 'scanned copy of business license', //营业执照扫描件
    isnull1: 'Contact name cannot be empty', //联系人姓名不能为空
    isnull2: 'Phone number cannot be empty', //电话号码不能为空
    mobilelength: 'Please enter the correct 6-digit to 15-digit mobile number',
    mobilelength1: 'Please enter the correct 6-digit to 15-digit phone number',
    isnull3: 'Contact email cannot be empty', //联系邮箱不能为空
    emailtype: 'Please enter the correct email',
    isnull4: 'School name cannot be empty', //学堂名称不能为空
    isnull5: 'School overview cannot be empty', //学堂概述不能为空
    isnull6: 'Logo cannot be empty', //logo不能为空
    isnull7: 'Customer service hotline can not be empty', //客服热线不能为空
    isnull8: 'Customer service email cannot be empty', //客服邮箱不能为空
    isnull9: 'Domain name cannot be empty', //域名不能为空
    isnull10: 'The name of the certifier cannot be empty', //认证人姓名不能为空
    isnull11: 'ID card number cannot be empty', //身份证号码不能为空
    isnull12: 'The front photo of the legal person ID card cannot be empty', //法人身份证正面照不能为空
    isnull13: 'The back photo of the legal person ID card cannot be empty', //法人身份证背面照不能为空
    isnull14: 'Business name cannot be empty', //企业名称不能为空
    isnull15: 'Business license cannot be empty', //营业执照不能为空
    isnull16: 'the scanned copy of business license cannot be empty', //营业执照扫描件不能为空
    isnull17: 'Course instructor', //法人身份证正面照不能为空
    isnull18: 'sales status', //法人身份证背面照不能为空
  },
  //课程管理 课堂配置 -set-InstConfig
  instConfig: {
    menu: "Classroom configuration",
    title: "Classroom configuration",
    minute: "minute",
    person: "students",
    home: "home",
    fromText: {
      toOneTit: "One-on-one class duration:",
      toOneEmpty: "One-on-one class duration cannot be empty!",
      toOneLimit: "One-to-one class duration cannot exceed 300 minutes",
      toOneTip: "The duration of each one-to-one lesson offered by this institution is 25 minutes by default.",
      smallTimeTit: "Small class duration:",
      smallTimeEmpty: "The duration of the small class can't be empty!",
      smallTimeLimit: "Small class duration can't exceed 300 minutes",
      smallTimeTip: "The duration of each small class offered by this institution is 45 minutes by default.",
      bigTimeTit: "Live class duration:",
      bigTimeEmpty: "The duration of the live class cannot be empty!",
      bigTimeLimit: "Live class duration cannot exceed 300 minutes",
      bigTimeTip: "The  duration of each live course offered by this institution is 45 minutes by default",
      smallNumTit: "The maximum number of small classes:",
      smallNumEmpty: "The maximum number of small classes cannot be empty!",
      smallNumTip: "The maximum number of students, who are allowed to enter the small class offered by this institution, is 12 by default.",
      bigNumTit: "Maximum number of live classes:",
      bigNumEmpty: "The maximum number of live classes cannot be empty!",
      bigNumTip: "The maximum number of students, who are allowed to enter the live class opened by this institution, is 1000 by default."
    },
  },
  add: {
    classTwacher: 'Course instructor', //课程讲师
    classStatus: 'sales status', //上架状态
    checkFail: 'The submitted qualification verification has not passed, please resubmit as required.', //您提交的资质认证审核不通过，请按照要求重新提交。
    goCheck: 'go to view', //前往查看
    duringCheck: 'The submitted qualification information is still under review, and the current operation authority is available only after the approval is passed. We will deal with it as soon as possible, please be patient!', //您提交的资质认证资料还在审核中，审核通过后才可获得当前操作权限。我们会尽快处理，请耐心等待！
    noCheck: 'You have not submitted the qualification certificate, and the current operation authority is available only after the certification is passed.', //您还未提交资质认证，认证通过后才可获得当前操作权限。
    noCheck1: '恭喜您，课程已经添加成功！但您还未进行身份认证，课程还未上架，认证通过后才可以上架，赶紧去认证吧！',//恭喜您，课程已经添加成功！但您还未进行身份认证，课程还未上架，认证通过后才可以上架，赶紧去认证吧！
    checkFail1: '恭喜您，课程已经添加成功！但您提交的身份认证资料审核不通过，请重新提交资料审核，赶紧去认证吧！', //恭喜您，课程已经添加成功！但您提交的身份认证资料审核不通过，请重新提交资料审核，赶紧去认证吧！
    duringCheck1: '恭喜您，课程已经添加成功！您提交的身份认证资料正在紧急审核中，审核通过后课程才可上架，请耐心等待！', //恭喜您，课程已经添加成功！您提交的身份认证资料正在紧急审核中，审核通过后课程才可上架，请耐心等待！

    checkNow: 'certificate immediately', //立即认证
    checkAfter: 'certificate later', //稍后认证
    singleInfo: 'The duration of each one-on-one course is 25 minutes by default. After the enrollment, the student can make an appointment for the class with the lecturer only according to the class outline,no specific class time required.', //1对1课程每节课授课时长默认为25分钟；学员报名后，由学员与讲师预约时间上课，只需要课时大纲，不需要安排具体上课时间
    smallInfo: 'Small class time is 45 minutes per class with12 as the maximum number of students ', //小班课每节课时间为45分钟；报名人数上限为12人
    largeInfo: 'The default time for each live class is 45 minutes with 100 as the maximum number of students.', //直播课每节课默认时间为45分钟，开班人数上限为100人
    chooseClass: 'choose a class', //选择班型
    singleList: '1-on-1 course list', //1对1课程列表
    smallList: 'course list of small class', //小班课课程列表
    largeList: 'course list of live class', //直播课课程列表
    singleInfo1: 'The duration of each one-on-one course is ',
    singleInfo2: ' minutes. After the enrollment, the student can make an appointment for the class with the lecturer only according to the class outline,no specific class time required.',
    smallInfo1: 'Small class time is ', 
    smallInfo2: ' minutes per class with ',
    smallInfo3: ' as the maximum number of students',
    largeInfo1: 'The time for each live class is ',
    largeInfo2: ' minutes with ',
    largeInfo3: ' as the maximum number of students',
    // 新增
    teacherInfo: 'Please add a teacher before doing this.'
  },
  rest: {
    logout: 'confirm the exit', // '退出确认'
    logoutInfo: 'Are you sure you want to sign out?', // '确定要退出登录吗？'
    yes: 'confirm', // '确定'
    countSet: 'account settings', // '帐户设置'
    phone: 'phone number', // '手机号'
    validate: 'Verification code', // '验证码'
    newPwd: 'new password', // '新密码'
    reNewPwd: 'confirm password', // '确认密码'
    priMobile: 'Original phone number', // '原手机号'
    newMobile: 'New phone number', // '新手机号'
    uploadImg: 'Upload avatar', // '上传头像'
    name: 'name', // '姓名'
    loginName: 'login name', // '登录名'
    realName: 'real name',
    edit: 'edit information', // '编辑资料'
    changePwd: 'change Password', // '修改密码'
    changeMobile: 'Modify phone number', // '修改手机号'
    sendValidate: 'Send the verification code', // '发送验证码'
    tip1: 'verification code must be filled!', // '验证码不能为空！'
    tip2: 'Please enter a new password!', // '请输入新密码！'
    tip3: 'The old password is inconsistent with the new password!', // '旧密码与新密码输入不一致！'
    tip4: 'Name cannot be empty', // '姓名不能为空'
    tip5: 'Please enter the original mobile number!', // '请输入原手机号！'
    tip6: 'Please enter the password again for confirmation!', // '请输入确认密码！'
    tip7: 'Please enter the nickname', // '请输入昵称'
    tip8: 'Please enter the login name', // '请输入登录名'
    tip9: 'Login name can be number, letter or underscore, within 6-16 digits', // '登录名可以是数字、字母或者下划线，6-16位'
    tip10: 'Please enter SMS verification code', // '请输入短信验证码'
    tip11: 'SMS verification code format is incorrect', // '短信验证码格式不正确'
    tip12: 'Please enter the password', // '请输入密码'
    tip13: 'Passwords can only be numbers, letters or underscores, within 6-16 digits', // '密码只可以是数字、字母或者下划线，6-16位'
    tip14: 'Please enter phone number', // '请输入手机号'
    tip15: 'please enter a valid phone number', // '请输入正确的手机号'
    tip16: 'Resend verification code', // '重发验证码'
    tip17: 'Please enter a graphic verification code',
    tip18: 'Please enter a new password of 6-16 digits, case sensitive and no spaces',
    tip19: 'Please enter the password',
    tip20: 'Please enter the username',
    unit: 'second', // '秒'
    forget: 'forget password',
    regist: 'register now',
    login: 'login',
  },
  //注册
  regist: {
    organInfo: ' Applicable to qualified education companies.You can add multiple teachers to teach.',
    teacherInfo: ' Applicable to individual lecturers who have the ability to teach without a registered company. You cannot add other teachers to teach.',
    teacherRegister: ' Personal lecturer registration',
    organRegister: ' Institution registration',
    hasAccount: 'Existing account',
    goLogin: 'Go to login >>',
  },
  //注册协议
  Agreement: {
    checktip: 'I have read and agreed to this agreement',
    title: 'Agency (individual teacher) registration agreement',
    introduction: 'Please read carefully and be sure to fully understand the terms and conditions. If you choose to accept these terms, it means you agree to be bound by the terms of the agreement. Otherwise, you will not be entitled to the rights set forth in this Agreement.',

    title1: ' Definition of Terms ',
    title1p1: '1.The user refers to the legally established and existing enterprise and non-enterprise units with legal person qualifications, or the unincorporated units where the individual teacher studios are stationed in the name of the group.',
    title1p2: '2.The software, website and App of the Course Website are collectively referred to as the Course Website in the following.',

    title2: ' Account ',
    title2p1: '1.Registrant qualification',
    title2p2: 'Please confirm that you are a natural person, legal person or other organization with full civil rights and civil capacity and are capable of acting independently of all actions you use to operate the Course Website.',
    title2p3: '2.Real-name authentication of the account',
    title2p4: '(1)After you fill out the information on the registration page, read and agree to the Terms of Service and complete all registration procedures, you will be asked to complete the registration information and upload a photo of the ID that can prove the identity of yourself and the agency you work for.The Course Website will verify the authenticity of you or the agency you work for in accordance with laws and regulations, determining whether you can use the services of the website based on the authentication information.',
    title2p5: '(2)On the basis of understanding and agreeing to the agreement, once you complete the registration process and registered successfully on this website, you have obtained the service account of the Course Website . At the same time, you also have access to this website as well as other websites/services (collectively referred to as “Course Website”) that may be launched later without re-registration, though there may be the requirement of the activating operation for some features when logging in for the first time with the login name. The finish of your registration means that you have authorized this website to make your account information disclosed to all the products of the Course Website, so that the services of the website is more available.',
    title2p6: '(3)You may not assign, donate or allow others to inherit your Course Website account (except for property rights related to the account), unless it is stipulated by law or effective legal documents, or in accordance with the conditions published by the Course Website. ',
    title2p7: '(4)To ensure the security of the account and transactions,you need to understand and agree that the Course Website have the right to request you to update the real-name certification of the account at any time; At the same time, you may be asked to provide more identity materials and information for further identity authentication or qualification verification in terms of the application of certain products or services.',

    title3: ' Information security',
    title3p1: '1. You need take responsibility for maintaining the confidentiality of your account and password on the Course Website, as well as all activities that occur under the login name and password, including, but not limited to, information disclosure, information posting, online consent clicking or submission of all kinds of rules agreements, online renewal agreements and purchase of services.You need to agree:',
    title3p2: 'A. If there is anyone using your account and password without authorization, or any other circumstances that violate the confidentiality rules, you will immediately notify the Course Website and authorize the website to synchronize the information;',
    title3p3: 'B. Make sure you leave the site in the correct steps at the end of each internet session, or the Course Website will not be responsible for any loss or damage that may occur as a result of your failure to the observation of this paragraph.You should understand that it takes a reasonable amount of time for the Course Website to take action on your request. The website does not take any responsibility for the consequences (including but not limited to any loss) that you have incurred before taking action.',
    title3p4: '2. You need understand and agree that the Course Website has the right to know the true background and purpose of your use of the products and services of this website,as well as to ask you to provide the information with authenticity,accuracy and comprehensiveness.; if the website has reasonable grounds to suspect that the information you provide is not true, you are making a false transaction, or your behavior violates the rules of the website, the website has the right to temporarily or permanently limit the usage of some or all of the functions of all products and / or services under your account.',
    title3p5: "3. You need understand and agree that the Course Website has the right to query our personal information as well as inquiry, freeze or deduct funds, transactions and accounts on this website in accordance with the requirements of the state's judicial, administrative, military, security and other institutions, including but not limited to public security organs, procuratorial organs, courts, customs, tax authorities and security departments.",
    title3p6: '4. When the website requires you to provide information about your personal identity, you will be informed in advance of the usage of the information and necessary measures will be taken to protect the security of your personal information.The website may not provide, disclose or share personally identifiable information such as your name, personal valid ID number and contact information in your registration materials with a third party without your permission, except in the following cases:',
    title3p7: 'A. You or your guardian authorize the Course Website to disclose it;',
    title3p8: 'B. Relevant laws require the disclosure of the Course Website;',
    title3p9: 'C. The judicial organ or administrative organ requires the Course Website to provide it based on legal procedures;',
    title3p10: 'D. The Course Website file a lawsuit or arbitration against you in order to protect its legitimate rights and interests;',
    title3p11: 'E. The Course Website provides it to your guardian at his/her legal request.',

    title4: ' Content specification',
    title4p1: "When using the Course Website service,you should abide by laws and regulations, socialist system, national interests, citizens' legitimate rights and interests, public order, social morality and information authenticity as you fill and log in the account information materials such as the account name, avatar and profile, paying attention to your behaviour in the live class. There shall not exist illegal and harmful information in the account materials, live broadcasts as well as the following circumstances:",
    title4p2: '1.Violation of the provisions of the Constitution or laws and regulations;',
    title4p3: '2.Endangerment of national security, divulgence of state secrets, subversion of state power, and undermining of national unity;',
    title4p4: '3.Damage to the national glory and interests as well as the public interest;',
    title4p5: '4.Incitement of national hatred and ethnic discrimination, and undermining of national unity;',
    title4p6: "5.Destruction of the state's religious policy and promotion of cults and feudal superstitions;",
    title4p7: '6.Dissemination of rumors, disruption of social order and undermining of social stability;',
    title4p8: '7.Spreading obscenity, pornography, gambling, violence, murder, terror or abetment;',
    title4p9: '8.Insulting or slandering others, infringing upon the lawful rights and interests of others;',
    title4p10: '5. Anything else prohibited by laws and administrative regulations.',
    title4p11: ' If there is illegal or harmful information in user information or live classroom, the website has the right to take notice to correct within a time limit or suspend the use. For fraudulent use of affiliates or social celebrities to log in, use, fill in account names, avatars, and personal profiles, the website has the right to cancel the use of the account on the Course Website and report to the competent government department.',

    title5: ' Exceptions ',
    title5p1: 'The user shall bear or recover from the responsible party for damages caused by, but not limited to, the following uncontrollable reasons of the Course Website or other faults not related to the website:',
    title5p2: '1.Service interruption caused by force majeure events;',
    title5p3: '2.Risk of loss of information and leakage due to irresistible factors such as computer viruses, Trojans or other malicious programs and hacker attacks;',
    title5p4: "3.Breakdown of user's computer software, system, hardware and communication lines or improperly operation from the user;",
    title5p5: '4. Login failure, incomplete data synchronization and slow page opening due to unstable website signal;',
    title5p6: '5. The risks and responsibilities brought by the forwarding and copying of the content posted by users;',
    title5p7: '6.If the website service needs to be suspended due to system maintenance or upgrade, the website will post a notice in advance;',
    title5p8: '7.Other reasons that cannot be controlled by the Course Website .',

    title6: ' Service change, interruption, termination ',
    title6p1: '1.If you are discovered to publish illegal information, seriously violate social ethics, and have other actions of the legal prohibition, the website has the right to terminate the service to you immediately.',
    title6p2: '2.If you implement any misconduct in violation of the agreement or relevant regulations when accepting the Course Website service, the website has the right to terminate the service to you.',
    title6p3: '3.If you have not registered with your true personally identifiable information or violated this Agreement or related regulations, the website has the right to suspend all or part of the services provided to you;The Course Website will notify you, when the suspension taking into effect, in a proper manner and inform you of the suspension period,which will be reasonable. Once the suspension is finished, the website should resume your service in time.',

    title7: ' Applicable law',
    title7p1: "1.The interpretation, validity and resolution of the Terms of Service apply to the laws of the People's Republic of China.",
    title7p2: "2.If there is any dispute between the user and the Course Website, it should first be settled through friendly negotiation. If the negotiation fails, either party has the right to submit the dispute to the People's Court of Chaoyang District, Beijing, where the headquarter of Course Website is located.",

    title8: ' Protocol validation',
    title8p1: '1. This Agreement shall become effective on the date of successful registration of the User.',
    title8p2: '2. The Course Website has the final interpretation right of this agreement within the scope permitted by law.',
  },
   //使用指南
   guild:{
    Chapter1:{
      title:"Chapter 1 Product Overview",//第一章	产品概述
      section1:{
        title:"1.1 Product Overview",//1.1 产品概述
        text1:"This document is mainly aimed to introduce the  functions of online registration, certification and management on courses, teachers, students and finance for agencies and individual lecturers,so that the user can learn to use the platform of",
        code:"Course Website",
        text2:" in the shortest time. The ",
        text3:"has the final interpretation right to the document."
      },
      section2:{
        title:"1.2	Registration, login and authentication",//1.2	注册、登录、以及认证
        item1:{
          title:"1.2.1 Registration",//1.2.1 注册
          sentence1:{
            code:"The Course Website",
            text1:" allows the registration of ",
            keyWord1:"qualified individual lecturers ",
            text2:"or",
            keyWord2:"agencies",
            text3:". The registration of  an individual lecturer finishing, his/her personal identification card and other information will be verified. When the verification is approved, the lecturer can add the course and start to teach, but no other teachers will be added.",
          },
          sentence2:{
            text:"After the registration of agencies, the business license, legal person identity and other information will be verified. When the verification is approved, courses and the teachers can be added independently. Then the class can be taught with its launching."
          },
          sentence3:{
            keyWord:"The biggest difference between a personal lecturer and an agency is that the later can add multiple teachers, while the former can never do the same thing,only teaching by himself.",
            text:"Therefore, please select the corresponding type according to your actual needs when registering.",
          },
          sentence4:{
            text1:"When agencies and individual teachers register,",
            keyWord:"the only identity is the mobile phone numbers, each of which is only allowed to register once,",
            text2:"supporting the numbers from mainland, overseas, Hong Kong, Macao and Taiwan. If you need to change the mobile phone number after registration, please contact our customer service staff."
          },
          sentence5:{
            text:"(1)Click the button showing that' I want to start the class' on the official website to enter the registration page for agencies."
          },
          sentence6:{
            text:"(2) After entering the registration page, it is required  to choose whether to register as an agency or an individual as well as  to fill in the user name, login password and mobile phone number,then entering the graphic verification code and SMS verification code to click on the registration. finishing all the steps,you can enter the background page of agencies."
          },
        },
        item2:{
          tiele:"1.2.2 Login",//1.2.2 登录
          sentence1:{
            text1:"You can have the account of the",
            code:"Course Website",
            text2:"after successful registration.The mobile phone number is the only login credentials and you can log in by entering your phone number and password."
          },
          sentence2:{
            text:"If you forget your password, you can retrieve it by clicking 'Forgot Password' on the login page."
          },
        },
        item3:{
          tiele:"1.2.3 Certification",//1.2.3 认证
          sentence1:{
            text1:"In order to ensure the authenticity of the user's identity and track the user's behavior, it is required to authenticate the identity of individual lecturers and agencies registered on the",
            code:"Course  Website",
            text2:"when operating the courses on sale, or to set the module for this step."
          },
          sentence2:{
            text:"The certification process is divided into three steps. First, you need to read and agree to the registration agreement. Second, you need to improve the identity and qualification information. Third, you will be notified by SMS when passing the official review."
          },
          sentence3:{
            text:"(1) Read the agreement, check 'I have read and agree to this agreement', then you can enter the next step."
          },
          sentence4:{
            text:"(2) Submit audit information and improve identity qualification information"
          },
          sentence5:{
            text:"Fill in the certification information and click submit. The official background will be reviewed within 1~2 working days, and the results will be notified to you by SMS."
          },
        },
      }
    },
    Chapter2:{
      title:"Chapter 2 Home",//第二章	 首页
      section1:{
        title:"2.1 System Home",//2.1 系统首页
        text1:"The system home page boasting statistical function, you can view the transaction status, class, students and class hours of agencies on the home page.",
      },
      section2:{
        title:"2.2 The schedule of agencies",//2.2 机构课表
        text1:"The schedules of class will be presented in a calendar, so you can clearly see the daily schedules under the agencies and view the details of those courses.",
        text2:"If you are a personal instructor, you can select the class under the corresponding date from the agency's class schedule, and you can directly enter the live classroom at the class time.",
        text3:"If you are an agency, you can also enter the classroom as an administrator to patrol the class according to the agency's class schedule. The teacher can also enter the classroom on the teacher’s end."
      },
    },
    Chapter3:{
      title:"Chapter 3 Course Management",//第三章	课程管理
      section1:{
        title:"3.1 Course Management",//3.1 课程管理
        text1:"(1) Click the Add button in the upper left corner to complete the addition of the course as prompted.",
        text2:"(2) The first step is to select the class to be opened，which includes 1-on-1 class, small class, and live class.It is required the teacher to set the free time to be reserved for the 1-on-1 class. After the start of 1-on-1 class, the students can reserve the teacher's free time according to their own needs.The class time of small class and live class is specified by agencies or lecturers. The former  is more suitable for the courses in which teachers and students have more audio and video interaction , the later for the open class which is teacher-based.",
        text3:"You can open different classes according to the content of the course, or launch multiple classes of different kind taught by different lecturers at different time for each course.",
        text4:"(3) The second step is to fill in the basic information of courses, including course classification, course name, course subtitle, and course overview, uploading the course cover.",
        text5:"(4)The third step is to fill in the class information of the class such as course unit, class hours and related courseware.The specific time of the class is required to be filled for a small class and a live class,not for a one-on-one course, which only need fill in the course unit, class hours and associated courseware.",
        text6:"Increase course unit",//增加课程单元
        text7:"Add class time, upload courseware",//增加课时，上传课件
        text8:"(4) The fourth step is to set the price of the course and click Save to save the course on the course list.",
        text9:"(5) After the course editing is completed, if you have already performed identity authentication, the small class and the live class will default to the on-sale status, and the 1-to-1 course to the enrollment status; if the identity is not authenticated, it will accordingly be the unsold status and enrollment suspending status.Please conduct the certification operation first (see 1.2.2), and then carry out the  on-sale courses  and enrollment operations.",
        text10:"As soon as the course is on sale, you can only operate it for  selling suspension . If you want to edit or delete the course, please remove its on-sale status first.",
      },
      section2:{
        title: "3.2 Courseware Management", //3.2 课件管理
        text1:"Whether for personal lecturers or an agencies, teachers will inevitably use a large number of courseware when they are teaching online. The courseware is allowed to be uploaded to the platform in advance and the course is allowed to be linked to the corresponding class time when being added.",
        text2:"During the class time, the associated courseware will be uploaded directly to the live classroom so that the courseware can be directly used.",
        text3:"You or your teacher is allowed to create your own folder and upload courseware in the folder. To ensure the safety of the courseware, the agency's administrator can delete all the courseware that it holds, while the teachers working for the agency can only delete the uploaded courseware by themselves.",
        sentence:{
          text1:"A variety of commonly used courseware, such as",
          keyWord:"Excel, Word, PPT, PDF, TXT, MP3, MP4",
          text2:"and various types of images, is supported to meet your needs."
        },
        text4:"Click on the folder to view all the courseware under the folder, and make the operation to upload,view and delete the courseware.",
      },
      section3:{
        title:"3.3 Class Management",//3.3 上课管理
        sentence1:{
          code:"The Course Website",
          text:"uses the interactive live broadcast service provided by Talk Cloud. Teachers and students can enter the live classroom from their own schedules to start classes."
        },
        sentence2:{
          text:"Please use the live broadcast platform as required.",
          keyWord:"If you post content that does not comply with laws and regulations during the live broadcast,  your live broadcast will be interrupted and your account will be disabled forever."
        },
        text:"Talk Cloud provides high-quality video and audio interactive live broadcast services with the features of low latency, no card and real restoring of offline teaching scene, so that teachers and students can make the  face-to-face interactions. At the same time, in the live classroom, Talk Cloud provides a variety of styles of interactive services, for instance,teachers can send trophies to students and all staff in the classroom can communicate in text.",
      }
    },
    Chapter4:{
      title:"Chapter 4 User Management",//第四章	用户管理
      section1:{
        title:"4.1 Teacher Management",//4.1 老师管理
        item1:{
          title:"4.1.1 Adding lecturers",//4.1.1 添加讲师
          text1:"If you are a personal instructor, you will not be able to add other teachers, only teaching by yourself. If you are an agency, you can invite teachers to join the agency by entering their phone number or by sending a link.",
          text2:"(1) Click Add Lectures and enter a teacher mobile phone number, if the teacher already has the Course Website account, he/she will be sent an invitation when clicking the invitation, then wait for the teacher to agree, as shown below:",
          text3:"(2) If the teacher does not have the Course Website account, an invitation registration link will be generated after entering the teacher's mobile phone number, and the teacher can directly serves the agency by using WeChat, QQ scan code or link registration."
        },
        item2:{
          tiele:"4.1.2 Instructor Management",//4.1.2 讲师管理
          text1:"After  instructors join your agency, you can disable or enable the instructors' account;  instructors can log in only when their accounts are enabled; you can also unbind these accounts.But note that you can only unbind these teachers after their courses are completed.",
          text2:"You can also set the one-on-one appointment time for the instructors under the agency. Only when the appointment time for the lecturers of one-on-one courses is set, can it be offered to the instructors."
        },
      },
      section2:{
        title:"4.2 Student Management",//4.2 学生管理
        text:"Students register on the Course Website by mobile phone number, and you can register the basic information of the students of the agency in the background."
      }
    },
    Chapter5:{
      title:"Chapter 5 Financial Management",//第五章 财务管理
      section1:{
        title:"5.1 Order Management",//5.1 订单管理
        text:"You can view all student orders for your course, including paid, pending, canceled orders as well as the details of each order."
      },
      section2:{
        title:"5.2 Account Details",//5.2 账户明细
        text1:"In order to protect the rights and interests of students, the fees paid by students for purchasing the courses will not directly be paid to your account.Instead, they will be paid after the course are completed.",
        text2:"In the background, you can view the amount and details that have been settled into your account, or you can view the amount that the student has paid but has not settled into your account. The security of your funds is absolutely guaranteed.",
        sentence1:{
          text:"If there is a balance in your account, you can initiate a withdrawal request at any time to transfer the money into your Alipay account. We will respond  and execute your request as quickly as possible.",
          keyWord:"If you are a personal instructor, when you initiate a withdrawal request, the Alipay account you filled out must be the one under the name of the certificate you filled in at the time of certification."
        },
        sentence2:{
          keyWord:"If you are an agency , the Alipay account you filled in must be corresponded to the one under the name of the agency you filled in at the time of certification.",
          text:"We will perform consistency verification when transferring funds. The inconsistency of the two account information will lead to the withdrawal failure."
        }
      },
      section3:{
        title:"5.3 Cash withdrawal details",//5.3 提现明细
        sentence:{
          text:"The withdrawal request you initiated may fail to be responded for some reasons. A general factor for that is the inconsistency of the Alipay account number filled in with the one which was filled in the identity information at the time of the certification.",
          keyWord:"If the withdrawal fails, please don't worry, we will return the money to your account and you can initiate the withdrawal request again."
        },
      },
      section4:{
        title:"5.4 Reconciliation Center",//5.4 对账中心
        text:"The reconciliation center serves to facilitate the view  on the output of each teacher in your agency within a certain period. You can enter the starting time to filter the value created by  teachers in a certain period of time. You can also enter the teachers’ name to search and view the value generated by teachers."
      },
    },
    hint:"The above is the using guide for agencies of the Course Website and it is expected to have an assistance to you. If there is any problems when using the website, you can contact our customer service staff.",
    tel:"Contact number: 086-010-84918242",//联系电话
    email:"Email: support@51menke.com"//邮箱
  },
  fastClass: {
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
