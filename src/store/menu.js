//修改此文件请阅读：

// 最大btnid 275 不能有重复！！！ 262与263是同一个功能 退款
// 最大菜单id 50

//修改此文件 如果是加的一级菜单且菜单下没有二级页面 那么同时要修改components/menu.vue router/index.js
// 如果加的是一级菜单的并且菜单下只有按钮没有其他页面 那么所有按钮也要加上path 比如(学员管理) 
//加一级菜单（学员管理 首页）也要做特殊处理 components/menu.vue（直接搜索newRoute.id==4）
//Login页面也要处理 

//要默认加上path 用于登陆是跳转到菜单的第一个






const menuDataRouter = [
  {
    "id": 1,
    "label": "首页",
    "path":"webAdminIndex?from=MainIndex"
  }, {
    "id": 2,
    "label": "运营推广",
    "children": [{
      "id": 8,
      "label": "我的二维码",
      "path":"enrollSpread?from=advertManagement",
      "children": [{
        "id": 83,
        "label": "新增二维码",
        "name":"add_org_qrcode"
      }, {
        "id": 84,
        "label": "删除二维码",
        "name":"del_org_qrcode"
      }]
    }, {
      "id": 9,
      "label": "广告管理",
      "path":'advertListV2?from=advertManagement',
      "children": [{
        "id": 18,
        "label": "新增广告",
        "name": "add_banner"
      }, {
        "id": 19,
        "label": "查看广告",
        "name": "get_banner"
      }, {
        "id": 20,
        "label": "编辑广告",
        "name": "edit_banner"
      }, {
        "id": 21,
        "label": "修改广告显示",
        "name": "on_off_banner"
      }, {
        "id": 22,
        "label": "删除广告",
        "name": "del_banner"
      }]
    }, {
      "id": 10,
      "label": "学校新闻",
      "path":"newsTrends?from=advertManagement",
      "children": [{
        "id": 23,
        "label": "新增新闻",
        "name": "add_news"
      }, {
        "id": 24,
        "label": "获取新闻",
        "name": "get_news"
      }, {
        "id": 25,
        "label": "编辑新闻",
        "name": "edit_news"
      }, {
        "id": 26,
        "label": "修改新闻显示",
        "name": "on_off_news"
      }, {
        "id": 27,
        "label": "删除新闻",
        "name": "del_news",
      }, {
        "id": 28,
        "label": "修改新闻置顶",
        "name": "top_news"
      }]
    }, {
      "id": 11,
      "label": "消息中心",
      "path": "newsListV2?from=advertManagement",
      "children": [{
        "id": 29,
        "label": "新增消息",
        "name": "add_message"
      }, {
        "id": 30,
        "label": "获取消息",
        "name": "get_message"
      }, {
        "id": 31,
        "label": "编辑消息",
        "name": "edit_message"
      }, {
        "id": 32,
        "label": "发送消息",
        "name": "send_message"
      }, {
        "id": 33,
        "label": "删除消息",
        "name": "del_message"
      }]
    }, {
      "id": 79,
      "label": "海报管理",
      "path": "posterManage?from=advertManagement",
      "children": [{
        "id": 102,
        "label": "系统海报",
        "name": "sys_poster",
        "children": [{
          "id": 108,
          "label": "下载",
          "name": "poster_download"
        }]
      }, {
        "id": 103,
        "label": "机构海报",
        "name": "org_poster",
        "children": [{
          "id": 104,
          "label": "添加",
          "name": "org_poster_create"
        }, {
          "id": 105,
          "label": "编辑",
          "name": "org_poster_update"
        }, {
          "id": 106,
          "label": "删除",
          "name": "org_poster_delete"
        }, {
          "id": 107,
          "label": "下载",
          "name": "org_poster_download",
        }]
      }]
    }]
  }, {
    "id": 3,
    "label": "课程信息",
    "name": "course_information",
    "children": [{
      "id": 12,
      "label": "课程管理",
      "name": "course_manage",
      "path":"courseManagementV2?from=LessonManagement",
      "children": [{
        "id": 82,
        "label": "新增课程分类",
        "name": "add_course_cat"
      }, {
        "id": 123,
        "label": "课节管理",
        "name": "rename_course"
      }, {
        "id": 75,
        "label": "重命名课程分类名",
        "name": "rename_course_cat"
      }, {
        "id": 77,
        "label": "删除课程分类",
        "name": "del_course_cat"
      }, {
        "id": 34,
        "label": "新增课程",
        "name": "add_course"
      }, {
        "id": 36,
        "label": "编辑课程",
        "name": "edit_course"
      }, {
        "id": 38,
        "label": "禁用启用课程",
        "name": "on_off_course",
      }, {
        "id": 39,
        "label": "删除课程",
        "name": "del_course",
      }]
    }, {
      "id": 13,
      "label": "乐谱管理",
      "name": "music_manage",
      "path":"musicManagementV2?from=LessonManagement",
      "children": [{
        "id": 100,
        "label": "新增乐谱分类",
        "name": "add_music_cat",
      }, {
        "id": 76,
        "label": "重命名乐谱分类名",
        "name": "rename_music_cat"
      }, {
        "id": 78,
        "label": "删除乐谱分类",
        "name": "del_music_cat",
      }, {
        "id": 40,
        "label": "新增乐谱",
        "name": "add_music",
      }, {
        "id": 42,
        "label": "编辑乐谱",
        "name": "edit_music",
      }, {
        "id": 44,
        "label": "禁用启用乐谱",
        "name": "on_off_music"
      }, {
        "id": 45,
        "label": "删除乐谱",
        "name": "del_music"
      }, {
        "id": 46,
        "label": "琴谱管理",
        "name": "music_child_manage",
        "children": [{
          "id": 47,
          "label": "新增琴谱",
          "name": "add_music_child"
        }, {
          "id": 48,
          "label": "禁用启用琴谱",
          "name": "on_off_music_child"
        }, {
          "id": 49,
          "label": "删除琴谱",
          "name": "del_music_child"
        }]
      }]
    }]
  }, {
    "id": 90,
    "label": "教务管理",
    "name": "educational",
    "path":"educationManageV2?from=educationManage",
    "children": [{
      "id": 91,
      "label": "单排约课",
      "name": "e_user_reserve_course",
      "path":"educationManageV2?from=educationManage",
    }, {
      "id": 92,
      "label": "重新约课",
      "name": "e_afresh_reserve_course",
      "path":"educationManageV2?from=educationManage",
    }, {
      "id": 93,
      "label": "取消课程",
      "name": "e_cancel_course",
      "path":"educationManageV2?from=educationManage",
    }, {
      "id": 94,
      "label": "批量约课",
      "name": "e_batch_user_reserve_course",
      "path":"educationManageV2?from=educationManage",
    }, {
      "id": 95,
      "label": "查看陪练报告",
      "name": "e_get_one_report",
      "path":"educationManageV2?from=educationManage",
    }, {
      "id": 96,
      "label": "查看取消原因",
      "name": "e_get_one_cancel_detail",
      "path":"educationManageV2?from=educationManage",
    }]
  }, {
    "id": 4,
    "label": "学员管理",
    "path":"studentManageV2?from=studentManage",
    "name": "user_manage",
    "children": [{
      "id": 50,
      "label": "编辑学员备注",
      "name": "edit_user_remark",
      "path":"studentManageV2?from=studentManage",
    }, {
      "id": 51,
      "label": "查看学员详情",
      "name": "get_user_detail",
      "path":"studentManageV2?from=studentManage",
      "children": [{
        "id": 53,
        "label": "查看学员订单记录",
        "name": "get_user_order"
      }, {
        "id": 54,
        "label": "查看学员上课记录",
        "name": "get_user_course_record",
        "children": [{
          "id": 56,
          "label": "重新约课",
          "name": "afresh_reserve_course"
        }, {
          "id": 57,
          "label": "取消课程",
          "name": "cancel_course"
        }]
      }, {
        "id": 55,
        "label": "用户约课",
        "name": "user_reserve_course",
      }, {
        "id": 81,
        "label": "批量约课",
        "name": "batch_user_reserve_course"
      }]
    }, {
      "id": 52,
      "label": "删除学员（取消绑定）",
      "name": "unbind_user",
      "path":"studentManageV2?from=studentManage",
    }, {
      "id": 109,
      "label": "学员别名",
      "name": "user_alias",
      "path":"studentManageV2?from=studentManage",
    }, {
      "id": 35,
      "label": "赠送课程",
      "name": "give_course",
      "path":"studentManageV2?from=studentManage",
    }]
  }, {
    "id": 5,
    "label": "老师管理",
    "name": "teacher_manage",
    "path":"teacherManageV2?from=teacherManageV2",
    "children": [{
      "id": 58,
      "label": "添加老师",
      "name": "add_teacher",
      "path":"teacherManageV2?from=teacherManageV2",
    }, {
      "id": 59,
      "label": "查看老师详情",
      "name": "get_teacher_detail",
      "path":"teacherManageV2?from=teacherManageV2",
    }, {
      "id": 60,
      "label": "删除老师（取消绑定）",
      "name": "unbind_teacher",
      "path":"teacherManageV2?from=teacherManageV2",
    }, {
      "id": 80,
      "label": "禁用启用老师",
      "name": "on_off_teacher",
      "path":"teacherManageV2?from=teacherManageV2",
    }]
  }, {
    "id": 6,
    "label": "订单管理",
    "name": "order_manage",
    "path":"orderListV2?from=OrderManagement",
    "children": [{
      "id": 61,
      "label": "新增订单",
      "name": "add_order",
      "path":"orderListV2?from=OrderManagement",
    }, {
      "id": 62,
      "label": "查看订单",
      "name": "get_order",
      "path":"orderListV2?from=OrderManagement",
      "children": [{
        "id": 63,
        "label": "修改订单状态（关闭或完成）",
        "name": "edit_order_state"
      }, {
        "id": 64,
        "label": "修改订单备注",
        "name": "edit_order_remark"
      }, {
        "id": 65,
        "label": "修改订单课程信息",
        "name": "edit_order_curriculum",
      }]
    }, {
      "id": 97,
      "label": "订单作废",
      "name": "nullify_order",
      "path":"orderListV2?from=OrderManagement",
    }]
  }, {
    "id": 7,
    "label": "系统管理",
    "name": "system_manage",
    "children": [{
      "id": 14,
      "label": "角色管理",
      "name": "role_manage",
      "path":"roleManagement?from=MainSet",
      "children": [{
        "id": 66,
        "label": "新增角色",
        "name": "add_role"
      }, {
        "id": 68,
        "label": "编辑角色", "name": "edit_role"
      }, {
        "id": 69,
        "label": "删除角色",
        "name": "del_role"
      }]
    }, {
      "id": 15,
      "label": "员工管理",
      "name": "staff_manage",
      "path":"organUserManageV2?from=MainSet",
      "children": [{
        "id": 70,
        "label": "新增员工",
        "name": "add_staff"
      }, {
        "id": 71,
        "label": "编辑员工",
        "name": "edit_staff"
      }, {
        "id": 72,
        "label": "禁用启用员工",
        "name": "on_off_staff"
      }, {
        "id": 73,
        "label": "删除员工",
        "name": "del_staff"
      }, {
        "id": 74,
        "label": "重置员工密码",
        "name": "reset_staff_password"
      }]
    }, {
      "id": 16,
      "label": "机构信息",
      "name": "org_information",
      "path":"platform?from=MainSet",
      "children": [{
        "id": 112,
        "label": "机构简介",
        "name": "org_information_show"
      }, {
        "id": 113,
        "label": "学校简介",
        "name": "org_intro"
      }, {
        "id": 114,
        "label": "师资力量",
        "name": "teacher_power_list", "children": [{
          "id": 115,
          "label": "添加",
          "name": "teacher_power_add"
        }, {
          "id": 117,
          "label": "删除",
          "name": "teacher_power_delete"
        }, {
          "id": 116,
          "label": "编辑",
          "name": "teacher_power_edit"
        }, {
          "id": 125,
          "label": "查看",
          "name": "teacher_power_show"
        }]
      }, {
        "id": 118,
        "label": "品牌荣誉",
        "name": "org_brand"
      }, {
        "id": 119,
        "label": "学员风采",
        "name": "student_list", "children": [{
          "id": 120,
          "label": "添加",
          "name": "student_add"
        }, {
          "id": 122,
          "label": "删除",
          "name": "student_delete"
        }, {
          "id": 121,
          "label": "编辑",
          "name": "student_edit"
        }, {
          "id": 124,
          "label": "查看",
          "name": "student_show"
        }]
      }]
    }, {
      "id": 17,
      "label": "其他设置",
      "path":"appointmentTime?from=MainSet",
      "name": "subscribe_manage", 
      "children": [{
        "id": 101,
        "label": "保存",
        "name": "other_config_save",
      }]
    }]
  }, {
    "id": 86,
    "label": "机构钱包",
    "name": "org_purse",
    "children": [{
      "id": 87,
      "label": "钱包数据",
      "name": "money",
      "path":"money?from=orgPurse",
      "children": [{
        "id": 98,
        "label": "余额提醒",
        "name": "moneyNotice"
      }, {
        "id": 99,
        "label": "充值",
        "name": "moneyRecharge"
      }]
    }, {
      "id": 88,
      "label": "充值明细",
      "path":"chargeRecord?from=orgPurse",
      "name": "chargeRecord"
    }, {
      "id": 89,
      "label": "费用明细",
      "path":"payRecord?from=orgPurse",
      "name": "payRecord"
    }]
  }
]
export default menuDataRouter;