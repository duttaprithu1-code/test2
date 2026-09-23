//=============================================================================
// MOG_PictureGallery.js
//=============================================================================

/*:
 * @plugindesc 图片库场景插件，支持自定义图片列表开关。
 * @author Moghunter (汉化及定制扩展)
 *
 * @param Number of Pictures
 * @text 图片数量
 * @desc 图片总数（仅在未使用自定义列表且开关关闭时有效）。
 * @type number
 * @default 4
 *
 * @param Command Menu
 * @text 显示主菜单命令
 * @desc 是否在主菜单显示“图片库”命令。
 * @type boolean
 * @default true
 *
 * @param Command Word
 * @text 命令名称
 * @desc 主菜单中的命令名称。
 * @type string
 * @default 图片库
 *
 * @param Completion Word
 * @text 完成度文字
 * @desc 完成度显示的文字（如“完成度”）。
 * @type string
 * @default 完成度
 *
 * @param Number Word
 * @text 编号前缀
 * @desc 缩略图下方编号前缀（如“图”）。
 * @type string
 * @default 图
 *
 * @param Thumbnails For Line
 * @text 每行缩略图数量
 * @desc 每行显示的缩略图数量。
 * @type number
 * @default 3
 *
 * @param Thumbnail X-Axis
 * @text 缩略图 X 偏移
 * @desc 缩略图在窗口内的X偏移量。
 * @type number
 * @default 23
 *
 * @param Thumbnail Y-Axis
 * @text 缩略图 Y 偏移
 * @desc 缩略图在窗口内的Y偏移量。
 * @type number
 * @default 25
 *
 * @param Number X-Axis
 * @text 编号 X 偏移
 * @desc 编号文字的X偏移量（相对于缩略图）。
 * @type number
 * @default 0
 *
 * @param Number Y-Axis
 * @text 编号 Y 偏移
 * @desc 编号文字的Y偏移量（相对于缩略图）。
 * @type number
 * @default -32
 *
 * @param Info Visible
 * @text 显示信息窗口
 * @desc 是否显示信息窗口（显示操作提示等）。
 * @type boolean
 * @default true
 *
 * @param Info X-Axis
 * @text 信息窗口 X 偏移
 * @desc 信息窗口的X坐标偏移。
 * @type number
 * @default 0
 *
 * @param Info Y-Axis
 * @text 信息窗口 Y 偏移
 * @desc 信息窗口的Y坐标偏移。
 * @type number
 * @default 0
 *
 * @param Info Duration
 * @text 信息显示时间
 * @desc 信息窗口显示持续时间（帧数）。
 * @type number
 * @default 90
 *
 * @param Double Click Speed
 * @text 双击取消速度
 * @desc 双击取消图片的判定时间（帧数）。
 * @type number
 * @default 10
 *
 * @param File Directory
 * @text 图片目录
 * @desc 图片文件存放目录（相对项目根目录）。
 * @type string
 * @default img/pictures/
 *
 * @param File Name
 * @text 文件名前缀
 * @desc 图片文件名前缀（例如“Pic_”，实际文件为 Pic_1.png, Pic_2.png...）。
 * @type string
 * @default Pic_
 *
 * @param Fit Screen Key
 * @text 适应屏幕按键
 * @desc 切换图片适应屏幕模式的按键。
 * @type string
 * @default pagedown
 *
 * @param Set Wallpaper
 * @text 启用设置壁纸
 * @desc 是否启用设置壁纸功能（需配合 MOG_MenuBackground 插件）。
 * @type boolean
 * @default true
 *
 * @param Set Wallpaper Key
 * @text 设置壁纸按键
 * @desc 设置当前图片为壁纸的按键。
 * @type string
 * @default pageup
 *
 * @param Enable Custom List
 * @text 启用自定义列表
 * @desc 是否使用自定义图片列表。若关闭，则使用“文件名前缀+数字”模式。
 * @type boolean
 * @default false
 *
 * @param Picture File List
 * @text 自定义图片列表
 * @desc 自定义图片文件名列表（不含扩展名）。仅在“启用自定义列表”为 true 时生效。
 * @type string[]
 * @default 
 *
 * @help
 * =============================================================================
 * +++ MOG - 图片库 (v1.6.zh) +++
 * 作者 Moghunter
 * 汉化及扩展
 * 原地址：https://atelierrgss.wordpress.com/
 * =============================================================================
 * 本插件为游戏添加一个图片库场景，玩家可以浏览已解锁的图片。
 * =============================================================================
 * 【图片文件放置】
 * 图片文件应放置在参数“图片目录”指定的文件夹中（默认 img/pictures/）。
 * 
 * 需要准备以下必要图片：
 *   - Pic_Thumb.png   （用于未解锁图片的占位缩略图）
 *   
 * 可选图片：
 *   - Pic_Info.png    （信息窗口图片，若“显示信息窗口”为true则需要）
 * 
 * 【图片文件命名规则】
 * - 若“启用自定义列表”为 false：
 *   按“文件名前缀 + 数字”命名，例如 Pic_1.png、Pic_2.png……
 *   图片数量由“图片数量”参数决定。
 * 
 * - 若“启用自定义列表”为 true：
 *   使用“自定义图片列表”中指定的文件名，例如 myphoto.png、scene.png……
 *   此时“文件名前缀”和“图片数量”参数将被忽略。
 *   注意：文件名不含扩展名，插件会自动添加 .png。
 * 
 * =============================================================================
 * 【调用方式】
 * 通过插件命令：picture_gallery
 * 若参数“显示主菜单命令”为 true，则主菜单中会自动出现“图片库”选项。
 *
 * =============================================================================
 * 【启用/禁用图片的插件命令】
 *   enable_picture : ID          （启用指定ID的图片，ID从1开始）
 *   disable_picture : ID         （禁用指定ID的图片）
 *   allenable_picture : 数量     （启用从1到指定数量的所有图片）
 *   alldisable_picture : 数量    （禁用从1到指定数量的所有图片）
 *
 * =============================================================================
 * 【版本历史】
 * (v1.5)   - 增加设置壁纸功能（需配合 MOG_MenuBackground 插件）
 *           - 优化效果
 * (v1.4)   - 兼容 MOG_MenuCursor 插件
 * (v1.3)   - 修复网页版读取问题，图片数量需在插件中定义
 * (v1.2)   - 修复部署到其他平台时的文件读取问题
 * (v1.1)   - 允许自定义图片目录，同时支持游戏内图片和图片库共用
 *           - 增加适应屏幕功能
 * (v1.5.zh)- 汉化并增加自定义图片文件名列表功能
 * (v1.6.zh)- 增加“启用自定义列表”开关，可自由切换两种模式
 * =============================================================================
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.MOG_PictureGallery = true;
var Moghunter = Moghunter || {};

Moghunter.parameters = PluginManager.parameters('MOG_PictureGallery');
Moghunter.picturegallery_picture_number = Number(Moghunter.parameters['Number of Pictures'] || 4);
Moghunter.picturegallery_setWallpaper = String(Moghunter.parameters['Set Wallpaper'] || "true");
Moghunter.picturegallery_command_menu = String(Moghunter.parameters['Command Menu'] || "true");
Moghunter.picturegallery_command_name = String(Moghunter.parameters['Command Word'] || "图片库");
Moghunter.picturegallery_completion_word = String(Moghunter.parameters['Completion Word'] || "完成度");
Moghunter.picturegallery_number_word = String(Moghunter.parameters['Number Word'] || "图");
Moghunter.picturegallery_thumbnail_x = Number(Moghunter.parameters['Thumbnail X-Axis'] || 23);
Moghunter.picturegallery_thumbnail_y = Number(Moghunter.parameters['Thumbnail Y-Axis'] || 25);
Moghunter.picturegallery_cols = Number(Moghunter.parameters['Thumbnails For Line'] || 3);
Moghunter.picturegallery_number_x = Number(Moghunter.parameters['Number X-Axis'] || 0);
Moghunter.picturegallery_number_y = Number(Moghunter.parameters['Number Y-Axis'] || -32);
Moghunter.picturegallery_double_click_speed = Number(Moghunter.parameters['Double Click Speed'] || 10);
Moghunter.picturegallery_directory = String(Moghunter.parameters['File Directory'] || "img/pictures/");
Moghunter.picturegallery_file_name = String(Moghunter.parameters['File Name'] || "Pic_");
Moghunter.picturegallery_fit_screen_key = String(Moghunter.parameters['Fit Screen Key'] || 'pagedown');
Moghunter.picturegallery_wallpaper_key = String(Moghunter.parameters['Set Wallpaper Key'] || 'pageup');
Moghunter.picturegallery_info = String(Moghunter.parameters['Info Visible'] || 'true');
Moghunter.picturegallery_infoX = Number(Moghunter.parameters['Info X-Axis'] || 0);
Moghunter.picturegallery_infoY = Number(Moghunter.parameters['Info Y-Axis'] || 0);
Moghunter.picturegallery_infoDuration = Number(Moghunter.parameters['Info Duration'] || 90);
Moghunter.picturegallery_enable_custom = String(Moghunter.parameters['Enable Custom List'] || "false");
Moghunter.picturegallery_custom_list = String(Moghunter.parameters['Picture File List'] || "");

//=============================================================================
// ** ImageManager
//=============================================================================

//==============================
// * 图片库专用加载
//==============================
ImageManager.picturegallery = function(filename) {
    return this.loadBitmap(Moghunter.picturegallery_directory, filename, 0, true);
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================

//==============================
// * 插件命令
//==============================
var _alias_mog_picturegallery_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _alias_mog_picturegallery_pluginCommand.call(this, command, args);
    if (command === "picture_gallery") { 
        $gameSystem.picturegallery(); 
    }
    if (command === "enable_picture") { 
        $gameSystem.enable_picture(Number(args[1]), true); 
    }
    if (command === "disable_picture") { 
        $gameSystem.enable_picture(Number(args[1]), false); 
    }
    if (command === "allenable_picture") {
        for (var i = 1; i < Number(args[1]) + 1; i++) { 
            $gameSystem.enable_picture(Number(i), true); 
        }
    }
    if (command === "alldisable_picture") {
        for (var i = 1; i < Number(args[1]) + 1; i++) { 
            $gameSystem.enable_picture(Number(i), false); 
        }
    }
    return true;
};

//=============================================================================
// ** Game_System
//=============================================================================

//==============================
// * 生成图片列表（增强版，支持数组格式，并记录开关状态）
//==============================
Game_System.prototype.make_picture_list = function() {
    this._picgl_data = [];
    var useCustom = String(Moghunter.picturegallery_enable_custom) === "true";
    var customList = Moghunter.picturegallery_custom_list;
    
    if (useCustom && customList && customList.trim() !== "") {
        // 使用自定义文件名列表（支持 JSON 数组或逗号分隔）
        var names = [];
        try {
            var parsed = JSON.parse(customList);
            if (Array.isArray(parsed)) {
                names = parsed.map(function(s) { return String(s).trim(); });
            } else {
                throw new Error("不是数组");
            }
        } catch (e) {
            names = customList.split(',').map(function(s) { return s.trim(); });
        }
        
        for (var i = 0; i < names.length; i++) {
            if (names[i] !== "") {
                this._picgl_data.push([false, names[i]]);
            }
        }
        this._useCustomPictureList = true;
    } else {
        // 使用默认前缀+数字
        for (var i = 0; i < Moghunter.picturegallery_picture_number; i++) {
            this._picgl_data.push([false, String(Moghunter.picturegallery_file_name + (i + 1))]);
        }
        this._useCustomPictureList = false;
    }
};

//==============================
// * 启用/禁用图片
//==============================
Game_System.prototype.enable_picture = function(value, enable) {
    var pic_id = Math.max(value - 1, 0);
    if (!this._picgl_data || !this._picgl_data[pic_id]) { return; }
    this._picgl_data[pic_id][0] = enable;
};

//==============================
// * 打开图片库场景（修改后）
//==============================
Game_System.prototype.picturegallery = function() {
    // 检查开关状态与现有列表是否一致，若不一致则重新生成
    var useCustom = String(Moghunter.picturegallery_enable_custom) === "true";
    if (this._picgl_data && this._useCustomPictureList !== useCustom) {
        this.make_picture_list();
    }
    
    if (!this._picgl_data || this._picgl_data.length === 0) {
        SoundManager.playBuzzer();
        var msg = "在文件夹 /" + Moghunter.picturegallery_directory + " 中找不到任何图片文件。\n";
        msg += "请检查：\n";
        msg += "1. 图片是否放置在正确目录\n";
        msg += "2. 若启用自定义列表，列表是否为空\n";
        msg += "3. 图片文件名是否正确（不含扩展名）";
        alert(msg);
        SceneManager.exit();
        return;
    }
    SoundManager.playOk();
    SceneManager.push(Scene_Picture_Gallery);
};

//=============================================================================
// ** Scene_Map
//=============================================================================

//==============================
// * 创建地图场景时初始化图片列表
//==============================
var _alias_mog_picturegallery_create = Scene_Map.prototype.create;
Scene_Map.prototype.create = function() {
    _alias_mog_picturegallery_create.call(this);
    if (!$gameSystem._picgl_data) {
        $gameSystem.make_picture_list();
    }
};

//=============================================================================
// ** Window_PictureList
//=============================================================================
function Window_PictureList() {
    this.initialize.apply(this, arguments);
}

Window_PictureList.prototype = Object.create(Window_Selectable.prototype);
Window_PictureList.prototype.constructor = Window_PictureList;

//==============================
// * 初始化
//==============================
Window_PictureList.prototype.initialize = function(x, y, width, height, pictures, no_data_pic) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._pictures = pictures;
    this._pic_no_data = no_data_pic;
    this._pic_thumb = [];
    this._pic_name = [];
    this._check_data = false;
    this._data = $gameSystem._picgl_data;
    this.activate();
    this.select(0);
    this.refresh();
};

//==============================
// * 最大列数
//==============================
Window_PictureList.prototype.maxCols = function() {
    return Moghunter.picturegallery_cols;
};

//==============================
// * 最大项目数
//==============================
Window_PictureList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

//==============================
// * 当前项是否可用
//==============================
Window_PictureList.prototype.isCurrentItemEnabled = function(index) {
    return this._data[index][0];
};

//==============================
// * 项目高度
//==============================
Window_PictureList.prototype.itemHeight = function() {
    return this.itemWidth() - (this.itemWidth() / 3);
};

//==============================
// * 刷新
//==============================
Window_PictureList.prototype.refresh = function() {
    this.createContents();
    this.contents.clear();
    for (var i = 0; i < this._pic_thumb.length; i++) {
        this._pic_thumb[i].visible = false;
        this._pic_name[i].visible = false;
    }
    this.drawAllItems();
};

//==============================
// * 绘制项目
//==============================
Window_PictureList.prototype.drawItem = function(index) {
    if (this._data[index]) {
        var rect = this.itemRect(index);
        if (!this._pic_thumb[index]) { 
            this.create_thumb(index, rect); 
        }
        this.refresh_position(index, rect);
    }
};

//==============================
// * 更新缩略图位置
//==============================
Window_PictureList.prototype.refresh_position = function(index, rect) {
    this._pic_thumb[index].x = rect.x + Moghunter.picturegallery_thumbnail_x;
    this._pic_thumb[index].y = rect.y + Moghunter.picturegallery_thumbnail_y;
    this._pic_name[index].x = this._pic_thumb[index].x + Moghunter.picturegallery_number_x;
    this._pic_name[index].y = this._pic_thumb[index].y + rect.height + Moghunter.picturegallery_number_y;
    this._pic_thumb[index].visible = true;
    this._pic_name[index].visible = true;
};

//==============================
// * 创建缩略图
//==============================
Window_PictureList.prototype.create_thumb = function(index, rect) {
    var pic_w = rect.width - 10;
    var pic_h = rect.height - 15;
    
    if (this.isCurrentItemEnabled(index)) {
        this._pic_thumb[index] = new Sprite(this._pictures[index]);
        this._pic_thumb[index].scX = pic_w / this._pictures[index].width;
        this._pic_thumb[index].scY = pic_h / this._pictures[index].height;
        this._pic_thumb[index].scale.x = this._pic_thumb[index].scX;
        this._pic_thumb[index].scale.y = this._pic_thumb[index].scY;
    } else {
        this._pic_thumb[index] = new Sprite(this._pic_no_data);
        this._pic_thumb[index].scX = pic_w / this._pic_no_data.width;
        this._pic_thumb[index].scY = pic_h / this._pic_no_data.height;
        this._pic_thumb[index].scale.x = this._pic_thumb[index].scX;
        this._pic_thumb[index].scale.y = this._pic_thumb[index].scY;
    }
    this.addChild(this._pic_thumb[index]);
    
    this._pic_name[index] = new Sprite(new Bitmap(rect.width - 10, 32));
    this._pic_name[index].bitmap.fontSize = 20;
    this._pic_name[index].bitmap.drawText(
        Moghunter.picturegallery_number_word + " " + String(index + 1), 
        0, 0, rect.width - 10, 32, "center"
    );
    this.addChild(this._pic_name[index]);
};

//==============================
// * 更新
//==============================
Window_PictureList.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if (this.opacity === 0) { 
        this.visible = false; 
    } else { 
        this.visible = true; 
    }
    for (var i = 0; i < this._pic_thumb.length; i++) {
        this._pic_thumb[i].opacity = this.contentsOpacity;
        this._pic_name[i].opacity = this.contentsOpacity;
    }
};

//==============================
// * 确定处理
//==============================
Window_PictureList.prototype.processOk = function() {
    this._check_data = true;
};

//==============================
// * 是否允许确定
//==============================
Window_PictureList.prototype.isOkEnabled = function() {
    return true;
};

//==============================
// * 最大组件数
//==============================
Window_PictureList.prototype.maxCom = function() {
    return this._pic_thumb.length;
};

//==============================
// * 滚轮处理
//==============================
Window_PictureList.prototype.processWheel = function() {
    if (Imported.MOG_MenuCursor) { return; }
    if (this.active) {
        var threshold = 20;
        if (TouchInput.wheelY >= threshold) {
            this._index++;
            SoundManager.playCursor();
            if (this._index > (this.maxItems() - 1)) { this._index = 0; }
            this.select(this._index);
        }
        if (TouchInput.wheelY <= -threshold) {
            this._index--;
            SoundManager.playCursor();
            if (this._index < 0) { this._index = (this.maxItems() - 1); }
            this.select(this._index);
        }
    }
};

//==============================
// * 是否需要更新背景透明度
//==============================
Window_PictureList.prototype.needUpdateBackOpacity = function() {
    return false;
};

//=============================================================================
// ** Window_PictureComp
//=============================================================================
function Window_PictureComp() {
    this.initialize.apply(this, arguments);
}

Window_PictureComp.prototype = Object.create(Window_Base.prototype);
Window_PictureComp.prototype.constructor = Window_PictureComp;

//==============================
// * 初始化
//==============================
Window_PictureComp.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._data = $gameSystem._picgl_data;
    this._comp_word = Moghunter.picturegallery_completion_word;
    this._data_comp = [];
    for (var i = 0; i < this._data.length; i++) {
        if (this._data[i][0]) { 
            this._data_comp.push(this._data[i]); 
        }
    }
    this.refresh();
};

//==============================
// * 刷新
//==============================
Window_PictureComp.prototype.refresh = function() {
    this.contents.clear();
    var comp = Math.floor((this._data_comp.length / this._data.length) * 100);
    var comp2 = "(" + this._data_comp.length + "/" + this._data.length + ")";
    this.drawText(this._comp_word + " " + comp + "% ", 0, 0, 200, "left");
    this.drawText(comp2, 0, 0, (this.width - 36), "right");
};

//==============================
// * 是否需要更新背景透明度
//==============================
Window_PictureComp.prototype.needUpdateBackOpacity = function() {
    return false;
};

//=============================================================================
// ** 主菜单命令添加
//=============================================================================
if (String(Moghunter.picturegallery_command_menu) === "true") {

    //==============================
    // * 创建命令列表
    //==============================
    var _alias_mog_picgal_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        _alias_mog_picgal_addOriginalCommands.call(this);
        this.addPictureGallery();
    };
    
    //==============================
    // * 添加图片库命令
    //==============================  
    Window_MenuCommand.prototype.addPictureGallery = function() {
        this.addCommand(String(Moghunter.picturegallery_command_name), 'picture_gallery', true);
    };  
    
    //=============================================================================
    // ** Scene_Menu
    //=============================================================================  
    
    //==============================
    // * 创建命令窗口
    //==============================
    var _alias_mog_picgal_reateCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _alias_mog_picgal_reateCommandWindow.call(this); 
        this._commandWindow.setHandler('picture_gallery', this.commandPictureGallery.bind(this));
        if (Imported.MOG_TimeSystem && Moghunter.timeWindow_menu) {   
            this._commandWindow.height -= this._commandWindow.itemHeight();
        }
    };

    //==============================
    // * 图片库命令处理
    //==============================
    Scene_Menu.prototype.commandPictureGallery = function() {   
        $gameSystem.picturegallery();
    };
}

//=============================================================================
// ** Scene_Picture_Gallery
//=============================================================================  
function Scene_Picture_Gallery() {
    this.initialize.apply(this, arguments);
}

Scene_Picture_Gallery.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Picture_Gallery.prototype.constructor = Scene_Picture_Gallery;

//==============================
// * 初始化
//==============================
Scene_Picture_Gallery.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
    this._data = $gameSystem._picgl_data;
    this._playing_index = -1;
    this.load_all_pictures();
    this.press_cancel = [0,0];
    this.show = [false,0];
    this._pxy = [0,0,0,0];
    this._pxy_old = [0,0,0,0,1];
    this._mxy = [0,0];
    this._wheel_d = 0;
    this._txv = null;
    this._fullMode = false;
    this._wallpaper = String(Moghunter.picturegallery_setWallpaper) === "true" ? true : false;
    this._wheelY_old = TouchInput.wheelY;
    this._fit_screen_key = String(Moghunter.picturegallery_fit_screen_key);
    this._wallpaper_key = String(Moghunter.picturegallery_wallpaper_key);
};

//==============================
// * 加载所有图片
//==============================
Scene_Picture_Gallery.prototype.load_all_pictures = function() {
    this._picture_cache = [];
    this._picture_data = [];
    this._no_data_pic = ImageManager.picturegallery("Pic_Thumb");
    for (var i = 0; i < this._data.length; i++) {
        this._picture_cache.push(ImageManager.picturegallery(this._data[i][1]));
        this._picture_data[i] = [-1,-1];
    }
};

//==============================
// * 刷新图片数据
//==============================
Scene_Picture_Gallery.prototype.refresh_picture_data = function() {
    for (var i = 0; i < this._picture_cache.length; i++) {
        this._picture_data[i][0] = this._picture_cache[i].width;
        this._picture_data[i][1] = this._picture_cache[i].height;
    }
    this.create_window_comp();
    this.create_window_list();      
    this.create_backgrounds();
    if (String(Moghunter.picturegallery_info) === "true") {
        this.createInfo();
    }
};

//==============================
// * 创建信息窗口
//==============================
Scene_Picture_Gallery.prototype.createInfo = function() {
    this._info = new Sprite(ImageManager.picturegallery("Pic_Info"));
    this._info.visible = false;
    this._info._duration = 0;
    this._info._phase = [0,-1,0];
    this._info._index = 0;
    this._info.org = [Moghunter.picturegallery_infoX, Moghunter.picturegallery_infoY];
    this._info.x = this._info.org[0];
    this._info.y = this._info.org[1] - 50;
    this.addChild(this._info);
};

//==============================
// * 移动图片
//==============================
Scene_Picture_Gallery.prototype.move_to = function(type, value) {
    if (this._fullMode) { return; }
    this._pxy[type] += value;
    this._pxy[type] = this._pxy[type].clamp(this._pxy[type + 2], 0);
};

//==============================
// * 移动速度
//==============================
Scene_Picture_Gallery.prototype.move_speed = function(type, value) {
    return (this._picture_data[this.index()][0] / 120) + 1;
};

//==============================
// * X轴限制
//==============================
Scene_Picture_Gallery.prototype.limitX = function() {
    return (Graphics.boxWidth - this._picture_data[this.index()][0]);
};

//==============================
// * Y轴限制
//==============================
Scene_Picture_Gallery.prototype.limitY = function() {
    return Graphics.boxHeight - this._picture_data[this.index()][1];
};

//==============================
// * 获取当前数据
//==============================
Scene_Picture_Gallery.prototype.data = function() {
    if (!this._w_list) { return null; }
    return this._data[this._w_list._index];
};

//==============================
// * 获取当前索引
//==============================
Scene_Picture_Gallery.prototype.index = function() {
    if (!this._w_list) { return -1; }
    return this._w_list._index;
};

//==============================
// * 创建背景
//==============================
Scene_Picture_Gallery.prototype.create_backgrounds = function() {
    this._picture = new Sprite();
    this._picture._ani = [false,0,0,0];
    this.addChild(this._picture);   
};

//==============================
// * 创建完成度窗口
//==============================
Scene_Picture_Gallery.prototype.create_window_comp = function() {
    var w = Graphics.boxWidth;
    var h = 72; 
    var x = 0;
    var y = 0;
    this._w_comp = new Window_PictureComp(x, y, w, h);
    this.addChild(this._w_comp);
};

//==============================
// * 创建列表窗口
//==============================
Scene_Picture_Gallery.prototype.create_window_list = function() {
    var w = Graphics.boxWidth;
    var h = Graphics.boxHeight - this._w_comp.height;  
    var x = 0;
    var y = this._w_comp.height;    
    this._w_list = new Window_PictureList(x, y, w, h, this._picture_cache, this._no_data_pic);
    this._w_list.setHandler('cancel', this.popScene.bind(this));   
    this.addChild(this._w_list);
}; 

//==============================
// * 刷新数据
//==============================
Scene_Picture_Gallery.prototype.refresh_data = function() {
    this._w_list._check_data = false;
    this.show[1] = 2;
    if (!this.data()[0]) { 
        this.nodata_effect(); 
        return; 
    }
    if (this.show[0]) { 
        this.show[0] = false; 
        return; 
    }
    SoundManager.playOk();
    this.set_new_data();
    this._playing_index = this.index();
};

//==============================
// * 设置全屏模式
//==============================
Scene_Picture_Gallery.prototype.set_FullMode = function() {
    this._fullMode = true;
    this._pxy_old = [
        this._pxy[0], 
        this._pxy[1],
        this._picture.anchor.x, 
        this._picture.anchor.y, 
        this._picture.scale.x
    ];
    this._pxy[0] = Graphics.boxWidth / 2;
    this._pxy[1] = Graphics.boxHeight / 2;
    this._picture.anchor.x = 0.5;
    this._picture.anchor.y = 0.5;
    var pic_w = Graphics.boxWidth;
    var pic_h = Graphics.boxHeight;
    this._picture.scale.x = pic_w / this._picture.width;
    this._picture.scale.y = pic_h / this._picture.height;
};

//==============================
// * 设置普通模式
//==============================
Scene_Picture_Gallery.prototype.set_NormalMode = function() {
    this._fullMode = false;
    this._pxy[0] = this._pxy_old[0];
    this._pxy[1] = this._pxy_old[1];
    this._picture.anchor.x = this._pxy_old[2];
    this._picture.anchor.y = this._pxy_old[3];
    this._picture.scale.x = this._pxy_old[4];
    this._picture.scale.y = this._pxy_old[4];
};

//==============================
// * 切换图片模式
//==============================
Scene_Picture_Gallery.prototype.changePictureMode = function() {
    SoundManager.playCursor();  
    if (!this._fullMode) {
        this.set_FullMode();
    } else {
        this.set_NormalMode();
    }
};

//==============================
// * 设置缩放
//==============================
Scene_Picture_Gallery.prototype.set_zoom = function(value) {
    if (this._fullMode) { return; }
    this._picture.scale.x += value;
    if (this._picture.scale.x > 1.50) { this._picture.scale.x = 1.50; }
    if (this._picture.scale.x < 1.00) { this._picture.scale.x = 1.00; }
    this._picture.scale.y = this._picture.scale.x;
};

//==============================
// * 无数据效果
//==============================
Scene_Picture_Gallery.prototype.nodata_effect = function() {
    SoundManager.playBuzzer();
    this.show[0] = false;
    this._playing_index = this.index();
};

//==============================
// * 设置新数据
//==============================
Scene_Picture_Gallery.prototype.set_new_data = function() {
    this.show[0] = true;
    if (this._info) {
        this._info._phase[0] = 1;
    }
    this.press_cancel[1] = 20;
    this._pxy = [this.limitX() / 2, this.limitY() / 2, this.limitX(), this.limitY()];
    this._pxy[0] = this._pxy[0].clamp(this._pxy[2], 0);
    this._pxy[1] = this._pxy[1].clamp(this._pxy[3], 0);
    this._picture.bitmap = this._picture_cache[this.index()];
    this._picture.anchor.x = 0;
    this._picture.anchor.y = 0;
    this._picture.opacity = 0;
    this._picture.scale.x = 1.00;
    this._picture.scale.y = 1.00;
    if (this.limitX() > 0) { this._picture.anchor.x = 0.5; }
    if (this.limitY() > 0) { this._picture.anchor.y = 0.5; }
    this._fullMode = false;
};

//==============================
// * 更新窗口
//==============================
Scene_Picture_Gallery.prototype.update_window = function() {
    if (this.show[1] > 0) { this.show[1] -= 1; }
    this._w_list.active = !this.show[0];        
    if (this.show[0]) {
        this._w_list.opacity -= 100;
        this._w_list.contentsOpacity -= 25;
        this._picture.opacity += 15;
    } else {
        this._w_list.opacity += 25;
        this._w_list.contentsOpacity += 25;
        if (Imported.MOG_MenuBackground) {
            if (this._w_list.opacity >= Moghunter.mback_opacity) {
                this._w_list.opacity = Moghunter.mback_opacity;
            }
        }
        this._picture.opacity -= 15;
    }
    this._w_comp.opacity = this._w_list.opacity;
    this._w_comp.contentsOpacity = this._w_list.contentsOpacity;
    if (this._backgroundSpriteNew) {
        this._backgroundSpriteNew.opacity = this._w_list.contentsOpacity;
    }
}; 

//==============================
// * 更新图片动画
//==============================
Scene_Picture_Gallery.prototype.updatePictureAnimation = function() {
    this._picture.opacity -= 15;
    this._picture.scale.x += 0.01;
    this._picture.scale.y = this._picture.scale.x;
    if (this._picture.opacity <= 0) {
        this._picture._ani[0] = false;
        this.refresh_data();
    }
};

//==============================
// * 更新图片输入
//==============================
Scene_Picture_Gallery.prototype.update_input_for_picture = function() {  
    this.update_Input();
    this.update_TouchInput();
    this.update_picture_position();
};

//==============================
// * 更新图片位置
//==============================
Scene_Picture_Gallery.prototype.update_picture_position = function() {  
    if (this._pxy[2] <= 0) {
        this._picture.x = this._pxy[0];
    } else {
        this._picture.x = (Graphics.boxWidth / 2);
    }
    if (this._pxy[3] <= 0) {
        this._picture.y = this._pxy[1];
    } else {
        this._picture.y = (Graphics.boxHeight / 2);
    }
    this._picture.scale.y = this._picture.scale.x;   
};

//==============================
// * 更新键盘输入
//==============================
Scene_Picture_Gallery.prototype.update_Input = function() { 
    if (this.needReturnToList()) { 
        this.return_to_data_list(); 
    }
    if (Input.isPressed("right")) { this.move_to(0, -this.move_speed()); }
    if (Input.isPressed("left")) { this.move_to(0, this.move_speed()); }
    if (Input.isPressed("down")) { this.move_to(1, -this.move_speed()); }
    if (Input.isPressed("up")) { this.move_to(1, this.move_speed()); }
    if (Input.isTriggered(this._fit_screen_key)) { this.changePictureMode(); }
    if (Input.isTriggered(this._wallpaper_key)) { this.setBackground(); }
};
  
//==============================
// * 是否需要返回列表
//==============================
Scene_Picture_Gallery.prototype.needReturnToList = function() { 
    if (TouchInput.isCancelled() && !TouchInput.isPressed()) { return true; }
    if (Input.isTriggered("cancel")) { return true; }
    if (Input.isTriggered("ok")) { return true; }
    return false;
};
  
//==============================
// * 返回数据列表
//==============================
Scene_Picture_Gallery.prototype.return_to_data_list = function() {  
    SoundManager.playCancel();
    if (this._info) {
        this._info._phase[0] = 0;
    }
    this.refresh_data();
};

//==============================
// * 设置壁纸（修复自定义列表模式）
//==============================
Scene_Picture_Gallery.prototype.setBackground = function() {  
    var fileName;
    if ($gameSystem._useCustomPictureList) {
        fileName = this._data[this._w_list._index][1];
    } else {
        fileName = String(Moghunter.picturegallery_file_name + (this._w_list._index + 1));
    }
    $gameSystem._backgroundName = fileName;
    
    this.set_FullMode();
    if (this._info) {
        this._info._phase[0] = 0;
    }
    this._picture._ani[0] = true;
    SoundManager.playOk();
};

//==============================
// * 设置滚轮动作
//==============================
Scene_Picture_Gallery.prototype.setWheelAction = function() {  
    this._wheel_d = 5;
    if (Imported.MOG_MenuBackground && this._wallpaper) {
        if (TouchInput.wheelY > 0) {
            this.changePictureMode();
        } else {
            this.setBackground();
        }
    } else {
        this.changePictureMode();
    }
};

//==============================
// * 更新触屏输入
//==============================
Scene_Picture_Gallery.prototype.update_TouchInput = function() {     
    if (TouchInput.isTriggered() && this.press_cancel[0] > 0 && this.press_cancel[1] === 0) {
        this.return_to_data_list();
    }
    if (this._wheel_d > 0) { this._wheel_d -= 1; }
    if (this._wheel_d === 0 && TouchInput.wheelY != 0) { 
        this.setWheelAction(); 
    }
    if (TouchInput.isPressed()) {
        if (TouchInput.isCancelled()) { 
            this.setBackground(); 
        }
        this.press_cancel[0] = Moghunter.picturegallery_double_click_speed;
        this._moveTo_TouchInput();
    } else {
        this._txv = null;
    }   
};

//==============================
// * 触屏移动
//==============================
Scene_Picture_Gallery.prototype._moveTo_TouchInput = function() {
    if (this._fullMode) { return; }
    if (!this._txv) {
        this._txv = [this._picture.x + TouchInput._x, this._picture.y + TouchInput._y];
        this._mxy[0] = TouchInput._x - this._txv[0];
        this._mxy[1] = TouchInput._y - this._txv[1];        
    }
    var mv = (this._mxy[0]) - (TouchInput._x - this._txv[0]);
    this.move_to(0, -mv);
    var mv = this._mxy[1] - (TouchInput._y - this._txv[1]);
    this.move_to(1, -mv);
    this._mxy[0] = TouchInput._x - this._txv[0];
    this._mxy[1] = TouchInput._y - this._txv[1];
};

//==============================
// * 是否需要更新输入
//==============================
Scene_Picture_Gallery.prototype.needUpdateInput = function() {
    if (this.show[1] != 0) { return false; }
    if (this._w_list.active) { return false; }
    if (this._picture._ani[0]) { return false; }
    return true;
};

//==============================
// * 刷新信息
//==============================
Scene_Picture_Gallery.prototype.refreshInfo = function() {
    var w = this._info.bitmap.width;
    var h = this._info.bitmap.height / 2;
    var i = h * this._info._phase[0];
    this._info.setFrame(0, i, w, h);
    this._info.opacity = 0;
    this._info._phase[1] = this._info._phase[0];
    this._info._phase[2] = 0;
    this._info._duration = Number(Moghunter.picturegallery_infoDuration);
    this._info.y = this._info.org[1] - 50;
    this._info.visible = true;
};

//==============================
// * 更新信息
//==============================
Scene_Picture_Gallery.prototype.updateInfo = function() {    
    if (this._info._phase[0] != this._info._phase[1]) { 
        this.refreshInfo(); 
    }
    if (this._info._phase[2] === 0) {
        this._info.opacity += 5;
        if (this._info.y < this._info.org[1]) {
            this._info.y += 3;
            if (this._info.y > this._info.org[1]) { 
                this._info.y = this._info.org[1]; 
            }
        }
        if (this._info.opacity >= 255) { 
            this._info._phase[2] = 1; 
        }
    } else if (this._info._phase[2] === 1) {
        this._info.y = this._info.org[1];
        this._info._duration--;
        if (this._info._duration <= 0) { 
            this._info._phase[2] = 2; 
        }
    } else {
        if (this._info.opacity > 0) {
            this._info.opacity -= 5;
            this._info.y -= 3;
        }
    }
};

//==============================
// * 更新
//==============================
Scene_Picture_Gallery.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    if (this._picture_data[0][1] === -1 && this._picture_cache[0].isReady()) { 
        this.refresh_picture_data(); 
    }
    if (this._picture_data[0][1] === -1) { return; }
    if (!this.data()) { return; }
    if (this._w_list._check_data) { 
        this.refresh_data(); 
    }
    if (!this._picture._ani[0]) {
        this.update_window(); 
    } else {
        this.updatePictureAnimation();
    }
    if (this.needUpdateInput()) { 
        this.update_input_for_picture(); 
    }
    if (this._info && this._info.bitmap.isReady()) { 
        this.updateInfo(); 
    }
    if (this.press_cancel[0] > 0) { 
        this.press_cancel[0] -= 1; 
    }
    if (this.press_cancel[1] > 0) { 
        this.press_cancel[1] -= 1; 
    }
};