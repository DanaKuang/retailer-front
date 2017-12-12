# 样式部分
### 主题配色
考虑到零售户端要可配置化，所以在theme.scss里面对接入进来的每一家中烟的零售户做了主题配色。
例如：
    .henan {
        <!-- 就是河南中烟下面零售户的样式 -->
        .theme-color {
            <!-- 比如黄金叶的主题色是黄色 -->
            <!-- 这是纯色 -->
        }
        .nav {
            <!-- 导航部分是渐变色，用background: linear-gradient()来实现 -->
            .icon {
                <!-- 导航栏的icon图标 -->
            }
        }
        .menu-icon {
            <!-- 门店中心的icon -->
        }
    }

# 引用的组件
### mint-ui
    datetimepicker
    infinit-scroll


### 备注（需要用到的插件）
上传图片&裁剪；
lazyload
infinit loading
统一加loading
