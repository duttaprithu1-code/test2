//=============================================================================
// MOG_PictureGallery.js
// 增加全局存档功能 + 文件存储 + 预加载
//=============================================================================

/*:
 * @plugindesc 图片库场景插件，支持自定义图片列表开关 + 全局解锁 + 预加载可选。
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
 * @param Global Unlock
 * @text 全局解锁
 * @desc 是否启用全局存档模式。开启后，解锁状态在所有存档中共享，数据保存到 save/ 文件夹下的 JSON 文件。
 * @type boolean
 * @default false
 *
 * @param Global File Name
 * @text 全局文件名
 * @desc 全局解锁数据文件名（不含扩展名），实际文件为 save/xxx.json。
 * @type string
 * @default global_pictures
 *
 * @param Auto Preload
 * @text 自动预加载
 * @desc 是否在游戏启动时自动预加载图片库资源（分帧加载，避免显示Loading.png）。
 * @type boolean
 * @default true
 *
 * @help
 * =============================================================================
 * +++ MOG - 图片库 +++
 * =============================================================================
 * 本插件为游戏添加一个图片库场景，玩家可以浏览已解锁的图片。
 * 支持全局解锁（所有存档共享）和自动预加载（可选）。
 * =============================================================================
 * 【全局存档模式说明】
 * 当“全局解锁”参数为 true 时：
 *   - 所有图片的解锁/锁定状态将保存到 save/ 文件夹下的独立 JSON 文件（默认为 global_pictures.json）。
 *   - 不同存档之间共享解锁进度，一次解锁，全存档可见。
 *   - 完成度按全局已解锁数量计算。
 *   - 批量指令（allenable_picture 等）将同时更新该文件。
 *   - 可使用插件命令 reset_global_unlock 重置所有图片为锁定状态。
 * 
 * 若“全局解锁”为 false，则保持原插件行为（解锁数据绑定当前存档）。
 * =============================================================================
 * 【预加载说明】
 * 当“自动预加载”为 true 时：
 *   - 游戏启动后（标题画面）立即开始后台分帧加载所有图片，每张加载完成后延迟一帧再加载下一张。
 *   - 加载过程中不会阻塞游戏操作，也不会显示引擎自带的 Loading.png。
 *   - 预加载完成前，玩家打开图片库的菜单命令是灰色的。
 *   - 预加载完成后，打开图片库瞬间显示所有缩略图，无任何加载延迟。
 * 
 * 若“自动预加载”为 false，则不会预加载，首次打开图片库时会一次性加载所有图片。
 * =============================================================================
 * 【图片文件放置】
 * 图片文件应放置在参数“图片目录”指定的文件夹中（默认 img/pictures/）。
 * 需要准备以下必要图片：
 *   - Pic_Thumb.png   （用于未解锁图片的占位缩略图）
 * 可选图片：
 *   - Pic_Info.png    （信息窗口图片，若“显示信息窗口”为true则需要）
 * 默认情况下，插件使用 “前缀 + 数字” 方式匹配图片文件（如 Pic_1.png、Pic_2.png）。
 * =============================================================================
 * 启用自定义列表后，您可以自由指定每个图片的文件名（无需连续数字，支持任意命名），
 * 方便管理非规则命名的图片集。
 * =============================================================================
 * 【调用方式】
 * 通过插件命令：picture_gallery
 * 若参数“显示主菜单命令”为 true，则主菜单中会自动出现“图片库”选项。
 *
 * =============================================================================
 * 【插件命令】
 *   picture_gallery                   - 打开图片库场景
 *   preload_picture_gallery           - 手动开始预加载（自动预加载关闭时可用）
 *   enable_picture : ID               - 启用指定ID的图片（全局模式下永久解锁）
 *   disable_picture : ID              - 禁用指定ID的图片
 *   allenable_picture : 数量          - 启用从1到指定数量的所有图片
 *   alldisable_picture : 数量         - 禁用从1到指定数量的所有图片
 *   reset_global_unlock               - （仅全局模式）重置所有图片为未解锁
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
Moghunter.picturegallery_global_unlock = String(Moghunter.parameters['Global Unlock'] || "false") === "true";
Moghunter.picturegallery_global_filename = String(Moghunter.parameters['Global File Name'] || "global_pictures");
Moghunter.picturegallery_auto_preload = String(Moghunter.parameters['Auto Preload'] || "true") === "true";

//=============================================================================
// ** 全局存档模块 (文件存储版)
//=============================================================================
var MOG_PictureGallery_Global = {};

MOG_PictureGallery_Global.storageFileName = Moghunter.picturegallery_global_filename + ".json";

MOG_PictureGallery_Global.getSaveFolderPath = function() {
    if (Utils.isNwjs()) {
        var path = require('path');
        return path.join(process.cwd(), 'save/');
    } else {
        return null;
    }
};

MOG_PictureGallery_Global.loadFromFile = function() {
    if (!Moghunter.picturegallery_global_unlock) return null;
    var folder = this.getSaveFolderPath();
    if (Utils.isNwjs() && folder) {
        try {
            var fs = require('fs');
            var path = require('path');
            var filePath = path.join(folder, this.storageFileName);
            if (fs.existsSync(filePath)) {
                var data = fs.readFileSync(filePath, 'utf8');
                return JSON.parse(data);
            }
        } catch(e) {
            console.error("MOG_PictureGallery: 读取全局文件失败", e);
        }
        return null;
    } else {
        var raw = localStorage.getItem(this.storageFileName);
        if (raw) {
            try { return JSON.parse(raw); } catch(e) { return null; }
        }
        return null;
    }
};

MOG_PictureGallery_Global.saveToFile = function(data) {
    if (!Moghunter.picturegallery_global_unlock) return;
    var folder = this.getSaveFolderPath();
    if (Utils.isNwjs() && folder) {
        try {
            var fs = require('fs');
            var path = require('path');
            var filePath = path.join(folder, this.storageFileName);
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, { recursive: true });
            }
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        } catch(e) {
            console.error("MOG_PictureGallery: 写入全局文件失败", e);
        }
    } else {
        localStorage.setItem(this.storageFileName, JSON.stringify(data));
    }
};

MOG_PictureGallery_Global.getPictureFileNameList = function() {
    var list = [];
    var useCustom = String(Moghunter.picturegallery_enable_custom) === "true";
    var customList = Moghunter.picturegallery_custom_list;
    if (useCustom && customList && customList.trim() !== "") {
        var names = [];
        try {
            var parsed = JSON.parse(customList);
            if (Array.isArray(parsed)) {
                names = parsed.map(function(s) { return String(s).trim(); });
            } else {
                throw new Error("not array");
            }
        } catch(e) {
            names = customList.split(',').map(function(s) { return s.trim(); });
        }
        for (var i=0; i<names.length; i++) {
            if (names[i] !== "") list.push(names[i]);
        }
    } else {
        for (var i=0; i<Moghunter.picturegallery_picture_number; i++) {
            list.push(String(Moghunter.picturegallery_file_name + (i+1)));
        }
    }
    return list;
};

MOG_PictureGallery_Global.initGlobalUnlockState = function() {
    var fileList = this.getPictureFileNameList();
    var saved = this.loadFromFile();
    var unlockedState = [];
    if (saved && saved.unlocked && saved.unlocked.length === fileList.length) {
        unlockedState = saved.unlocked.slice();
    } else {
        for (var i=0; i<fileList.length; i++) unlockedState.push(false);
    }
    var globalData = {
        unlocked: unlockedState,
        fileList: fileList
    };
    this.saveToFile(globalData);
    return globalData;
};

MOG_PictureGallery_Global.getUnlockedState = function() {
    if (!Moghunter.picturegallery_global_unlock) return [];
    var data = this.loadFromFile();
    var fileList = this.getPictureFileNameList();
    if (!data || !data.unlocked || data.unlocked.length !== fileList.length) {
        data = this.initGlobalUnlockState();
    }
    return data.unlocked;
};

MOG_PictureGallery_Global.setUnlocked = function(index, enabled) {
    if (!Moghunter.picturegallery_global_unlock) return false;
    var unlocked = this.getUnlockedState();
    if (index >= 0 && index < unlocked.length) {
        unlocked[index] = enabled;
        var fileList = this.getPictureFileNameList();
        this.saveToFile({ unlocked: unlocked, fileList: fileList });
        return true;
    }
    return false;
};

MOG_PictureGallery_Global.batchSetUnlocked = function(startIdx, count, enabled) {
    if (!Moghunter.picturegallery_global_unlock) return;
    var unlocked = this.getUnlockedState();
    var changed = false;
    for (var i=startIdx; i<startIdx+count && i<unlocked.length; i++) {
        if (unlocked[i] !== enabled) {
            unlocked[i] = enabled;
            changed = true;
        }
    }
    if (changed) {
        var fileList = this.getPictureFileNameList();
        this.saveToFile({ unlocked: unlocked, fileList: fileList });
    }
};

MOG_PictureGallery_Global.resetAll = function() {
    if (!Moghunter.picturegallery_global_unlock) return;
    var fileList = this.getPictureFileNameList();
    var unlocked = [];
    for (var i=0; i<fileList.length; i++) unlocked.push(false);
    this.saveToFile({ unlocked: unlocked, fileList: fileList });
};

MOG_PictureGallery_Global.getDataArray = function() {
    if (!Moghunter.picturegallery_global_unlock) return [];
    var fileList = this.getPictureFileNameList();
    var unlocked = this.getUnlockedState();
    var result = [];
    for (var i=0; i<fileList.length; i++) {
        result.push([unlocked[i], fileList[i]]);
    }
    return result;
};

//=============================================================================
// ** ImageManager
//=============================================================================
ImageManager.picturegallery = function(filename) {
    return this.loadBitmap(Moghunter.picturegallery_directory, filename, 0, true);
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================
var _alias_mog_picturegallery_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _alias_mog_picturegallery_pluginCommand.call(this, command, args);
    if (command === "picture_gallery") {
        $gameSystem.picturegallery();
    }
    if (command === "preload_picture_gallery") {
        $gameSystem.preloadPictureGallery();
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
    if (command === "reset_global_unlock" && Moghunter.picturegallery_global_unlock) {
        MOG_PictureGallery_Global.resetAll();
        if (SceneManager._scene instanceof Scene_Picture_Gallery) {
            SceneManager._scene.refreshAfterGlobalReset();
        }
        SoundManager.playOk();
    }
    return true;
};

//=============================================================================
// ** Game_System
//=============================================================================
Game_System.prototype.make_picture_list = function() {
    this._picgl_data = [];
    var useCustom = String(Moghunter.picturegallery_enable_custom) === "true";
    var customList = Moghunter.picturegallery_custom_list;
    
    if (useCustom && customList && customList.trim() !== "") {
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
        for (var i=0; i<names.length; i++) {
            if (names[i] !== "") {
                this._picgl_data.push([false, names[i]]);
            }
        }
        this._useCustomPictureList = true;
    } else {
        for (var i=0; i<Moghunter.picturegallery_picture_number; i++) {
            this._picgl_data.push([false, String(Moghunter.picturegallery_file_name + (i+1))]);
        }
        this._useCustomPictureList = false;
    }
};

Game_System.prototype.enable_picture = function(value, enable) {
    var pic_id = Math.max(value - 1, 0);
    if (Moghunter.picturegallery_global_unlock) {
        MOG_PictureGallery_Global.setUnlocked(pic_id, enable);
        if (SceneManager._scene && SceneManager._scene.refreshGlobalData) {
            SceneManager._scene.refreshGlobalData();
        }
    } else {
        if (!this._picgl_data || !this._picgl_data[pic_id]) { return; }
        this._picgl_data[pic_id][0] = enable;
    }
};

// 分帧预加载
Game_System.prototype.preloadPictureGallery = function() {
    if (!Moghunter.picturegallery_auto_preload) return;
    if (this._preloadStarted) return;
    this._preloadStarted = true;
    
    // 1. 获取所有图片文件名列表（定义在顶部，确保作用域）
    var fileNames = [];
    if (Moghunter.picturegallery_global_unlock) {
        var dataArr = MOG_PictureGallery_Global.getDataArray();
        fileNames = dataArr.map(function(item) { return item[1]; });
    } else {
        if (!this._picgl_data) this.make_picture_list();
        fileNames = this._picgl_data.map(function(item) { return item[1]; });
    }
    
    if (!fileNames || fileNames.length === 0) {
        this._preloadComplete = true;
        return;
    }
    
    this._preloadTotal = fileNames.length;
    this._preloadLoaded = 0;
    this._preloadComplete = false;
    var index = 0;
    var self = this;
    
    function loadNext() {
        if (index >= fileNames.length) {
            self._preloadComplete = true;
            console.log("图片库预加载完成，共 " + fileNames.length + " 张");
            // 如果当前在菜单场景，刷新命令窗口（启用图片库命令）
            if (SceneManager._scene instanceof Scene_Menu) {
                if (SceneManager._scene._commandWindow && SceneManager._scene._commandWindow.refresh) {
                    SceneManager._scene._commandWindow.refresh();
                }
            }
            return;
        }
        var bmp = ImageManager.picturegallery(fileNames[index]);
        bmp.addLoadListener(function() {
            index++;
            //setTimeout(loadNext, 16); // 分帧延迟
			requestAnimationFrame(loadNext);
        });
    }
    loadNext();
};

// 打开图片库（检查预加载完成标志）
Game_System.prototype.picturegallery = function() {
    if (Moghunter.picturegallery_auto_preload && !this._preloadComplete) {
        SoundManager.playBuzzer();
        // 不弹 alert，直接返回，菜单中的命令会被禁用（见下方修改）
        return;
    }
    var useCustom = String(Moghunter.picturegallery_enable_custom) === "true";
    if (!Moghunter.picturegallery_global_unlock) {
        if (this._picgl_data && this._useCustomPictureList !== useCustom) {
            this.make_picture_list();
        }
        if (!this._picgl_data || this._picgl_data.length === 0) {
            SoundManager.playBuzzer();
            var msg = "在文件夹 /" + Moghunter.picturegallery_directory + " 中找不到任何图片文件。\n请检查参数设置。";
            alert(msg);
            SceneManager.exit();
            return;
        }
    } else {
        var globalData = MOG_PictureGallery_Global.getDataArray();
        if (!globalData || globalData.length === 0) {
            SoundManager.playBuzzer();
            alert("全局模式：图片列表为空，请检查插件参数中的图片数量或自定义列表。");
            SceneManager.exit();
            return;
        }
    }
    SoundManager.playOk();
    SceneManager.push(Scene_Picture_Gallery);
};

//=============================================================================
// ** Scene_Map 和 Scene_Title 预加载触发
//=============================================================================
var _alias_mog_picgal_map_create = Scene_Map.prototype.create;
Scene_Map.prototype.create = function() {
    _alias_mog_picgal_map_create.call(this);
    if (!Moghunter.picturegallery_global_unlock) {
        if (!$gameSystem._picgl_data) {
            $gameSystem.make_picture_list();
        }
    } else {
        MOG_PictureGallery_Global.initGlobalUnlockState();
    }
    // 自动预加载（如果开启）
    $gameSystem.preloadPictureGallery();
};

var _alias_mog_picgal_title_create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
    _alias_mog_picgal_title_create.call(this);
    // 在标题界面也启动预加载，确保尽早开始
    $gameSystem.preloadPictureGallery();
};

//=============================================================================
// ** Window_PictureList (原始一次性显示，图片已在缓存中)
//=============================================================================
function Window_PictureList() {
    this.initialize.apply(this, arguments);
}
Window_PictureList.prototype = Object.create(Window_Selectable.prototype);
Window_PictureList.prototype.constructor = Window_PictureList;

Window_PictureList.prototype.initialize = function(x, y, width, height, pictures, no_data_pic) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._pictures = pictures;
    this._pic_no_data = no_data_pic;
    this._pic_thumb = [];
    this._pic_name = [];
    this._check_data = false;
    this.refreshDataSource();
    this.activate();
    this.select(0);
    this.refresh();
};

Window_PictureList.prototype.refreshDataSource = function() {
    if (Moghunter.picturegallery_global_unlock) {
        this._data = MOG_PictureGallery_Global.getDataArray();
    } else {
        this._data = $gameSystem._picgl_data;
    }
};

Window_PictureList.prototype.maxCols = function() {
    return Moghunter.picturegallery_cols;
};

Window_PictureList.prototype.maxItems = function() {
    this.refreshDataSource();
    return this._data ? this._data.length : 1;
};

Window_PictureList.prototype.isCurrentItemEnabled = function(index) {
    this.refreshDataSource();
    return this._data[index] ? this._data[index][0] : false;
};

Window_PictureList.prototype.itemHeight = function() {
    return this.itemWidth() - (this.itemWidth() / 3);
};

Window_PictureList.prototype.refresh = function() {
    this.refreshDataSource();
    this.createContents();
    this.contents.clear();
    for (var i = 0; i < this._pic_thumb.length; i++) {
        if (this._pic_thumb[i]) this.removeChild(this._pic_thumb[i]);
        if (this._pic_name[i]) this.removeChild(this._pic_name[i]);
    }
    this._pic_thumb = [];
    this._pic_name = [];
    this.drawAllItems();
};

Window_PictureList.prototype.drawItem = function(index) {
    if (!this._data[index]) return;
    var rect = this.itemRect(index);
    this.createThumb(index, rect);
    this.createPictureName(index, rect);
};

Window_PictureList.prototype.createThumb = function(index, rect) {
    var pic_w = rect.width - 10;
    var pic_h = rect.height - 15;
    var sprite;
    if (this.isCurrentItemEnabled(index)) {
        var bmp = this._pictures[index];
        sprite = new Sprite(bmp);
        sprite.scale.x = pic_w / bmp.width;
        sprite.scale.y = pic_h / bmp.height;
    } else {
        sprite = new Sprite(this._pic_no_data);
        sprite.scale.x = pic_w / this._pic_no_data.width;
        sprite.scale.y = pic_h / this._pic_no_data.height;
    }
    sprite.x = rect.x + Moghunter.picturegallery_thumbnail_x;
    sprite.y = rect.y + Moghunter.picturegallery_thumbnail_y;
    sprite.visible = true;
    this.addChild(sprite);
    this._pic_thumb[index] = sprite;
};

Window_PictureList.prototype.createPictureName = function(index, rect) {
    var nameSprite = new Sprite(new Bitmap(rect.width - 10, 32));
    nameSprite.bitmap.fontSize = 20;
    nameSprite.bitmap.drawText(
        Moghunter.picturegallery_number_word + " " + String(index + 1),
        0, 0, rect.width - 10, 32, "center"
    );
    nameSprite.x = rect.x + Moghunter.picturegallery_thumbnail_x + Moghunter.picturegallery_number_x;
    nameSprite.y = rect.y + Moghunter.picturegallery_thumbnail_y + rect.height + Moghunter.picturegallery_number_y;
    this.addChild(nameSprite);
    this._pic_name[index] = nameSprite;
};

Window_PictureList.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if (this.opacity === 0) {
        this.visible = false;
    } else {
        this.visible = true;
    }
    for (var i = 0; i < this._pic_thumb.length; i++) {
        if (this._pic_thumb[i]) this._pic_thumb[i].opacity = this.contentsOpacity;
        if (this._pic_name[i]) this._pic_name[i].opacity = this.contentsOpacity;
    }
};

Window_PictureList.prototype.processOk = function() {
    this._check_data = true;
};

Window_PictureList.prototype.isOkEnabled = function() {
    return true;
};

Window_PictureList.prototype.maxCom = function() {
    return this._pic_thumb.length;
};

Window_PictureList.prototype.processWheel = function() {
    if (Imported.MOG_MenuCursor) return;
    if (this.active) {
        var threshold = 20;
        if (TouchInput.wheelY >= threshold) {
            this._index++;
            SoundManager.playCursor();
            if (this._index > this.maxItems() - 1) this._index = 0;
            this.select(this._index);
        }
        if (TouchInput.wheelY <= -threshold) {
            this._index--;
            SoundManager.playCursor();
            if (this._index < 0) this._index = this.maxItems() - 1;
            this.select(this._index);
        }
    }
};

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

Window_PictureComp.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._comp_word = Moghunter.picturegallery_completion_word;
    this.refreshData();
    this.refresh();
};

Window_PictureComp.prototype.refreshData = function() {
    if (Moghunter.picturegallery_global_unlock) {
        this._data = MOG_PictureGallery_Global.getDataArray();
    } else {
        this._data = $gameSystem._picgl_data;
    }
    this._data_comp = [];
    if (this._data) {
        for (var i = 0; i < this._data.length; i++) {
            if (this._data[i][0]) this._data_comp.push(this._data[i]);
        }
    }
};

Window_PictureComp.prototype.refresh = function() {
    this.refreshData();
    this.contents.clear();
    var total = this._data ? this._data.length : 1;
    var unlocked = this._data_comp ? this._data_comp.length : 0;
    var comp = total > 0 ? Math.floor((unlocked / total) * 100) : 0;
    var comp2 = "(" + unlocked + "/" + total + ")";
    this.drawText(this._comp_word + " " + comp + "% ", 0, 0, 200, "left");
    this.drawText(comp2, 0, 0, (this.width - 36), "right");
};

Window_PictureComp.prototype.needUpdateBackOpacity = function() {
    return false;
};

//=============================================================================
// ** 主菜单命令添加
//=============================================================================
if (String(Moghunter.picturegallery_command_menu) === "true") {
    var _alias_mog_picgal_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        _alias_mog_picgal_addOriginalCommands.call(this);
        this.addPictureGallery();
    };
    
  Window_MenuCommand.prototype.addPictureGallery = function() {
    var enabled = true;
    // 如果开启了自动预加载，且预加载尚未完成，则禁用该命令
    if (Moghunter.picturegallery_auto_preload && $gameSystem && !$gameSystem._preloadComplete) {
        enabled = false;
    }
    this.addCommand(String(Moghunter.picturegallery_command_name), 'picture_gallery', enabled);
};
    
    var _alias_mog_picgal_reateCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _alias_mog_picgal_reateCommandWindow.call(this);
        this._commandWindow.setHandler('picture_gallery', this.commandPictureGallery.bind(this));
        if (Imported.MOG_TimeSystem && Moghunter.timeWindow_menu) {
            this._commandWindow.height -= this._commandWindow.itemHeight();
        }
    };

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

Scene_Picture_Gallery.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
    this.loadGlobalData();
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
    this._wallpaper = String(Moghunter.picturegallery_setWallpaper) === "true";
    this._wheelY_old = TouchInput.wheelY;
    this._fit_screen_key = String(Moghunter.picturegallery_fit_screen_key);
    this._wallpaper_key = String(Moghunter.picturegallery_wallpaper_key);
};

Scene_Picture_Gallery.prototype.loadGlobalData = function() {
    if (Moghunter.picturegallery_global_unlock) {
        this._data = MOG_PictureGallery_Global.getDataArray();
    } else {
        this._data = $gameSystem._picgl_data;
    }
};

Scene_Picture_Gallery.prototype.refreshGlobalData = function() {
    this.loadGlobalData();
    if (this._w_list) {
        this._w_list.refreshDataSource();
        this._w_list.refresh();
    }
    if (this._w_comp) this._w_comp.refresh();
};

Scene_Picture_Gallery.prototype.refreshAfterGlobalReset = function() {
    this.refreshGlobalData();
    if (this._w_list) this._w_list.select(0);
};

Scene_Picture_Gallery.prototype.load_all_pictures = function() {
    this._picture_cache = [];
    this._picture_data = [];
    this._no_data_pic = ImageManager.picturegallery("Pic_Thumb");
    for (var i = 0; i < this._data.length; i++) {
        var bmp = ImageManager.picturegallery(this._data[i][1]);
        this._picture_cache.push(bmp);
        this._picture_data[i] = [bmp.width, bmp.height];
    }
};

Scene_Picture_Gallery.prototype.refresh_picture_data = function() {
    // 1. 获取所有图片的真实宽高
    for (var i = 0; i < this._picture_cache.length; i++) {
        var bmp = this._picture_cache[i];
        if (bmp && bmp.width && bmp.height) {
            this._picture_data[i][0] = bmp.width;
            this._picture_data[i][1] = bmp.height;
        }
    }
    // 2. 创建窗口组件（原有逻辑）
    this.create_window_comp();
    this.create_window_list();
    this.create_backgrounds();
    if (String(Moghunter.picturegallery_info) === "true") {
        this.createInfo();
    }
};

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

Scene_Picture_Gallery.prototype.move_to = function(type, value) {
    if (this._fullMode) return;
    this._pxy[type] += value;
    this._pxy[type] = this._pxy[type].clamp(this._pxy[type+2], 0);
};

Scene_Picture_Gallery.prototype.move_speed = function(type, value) {
    return (this._picture_data[this.index()][0] / 120) + 1;
};

Scene_Picture_Gallery.prototype.limitX = function() {
    return Graphics.boxWidth - this._picture_data[this.index()][0];
};

Scene_Picture_Gallery.prototype.limitY = function() {
    return Graphics.boxHeight - this._picture_data[this.index()][1];
};

Scene_Picture_Gallery.prototype.data = function() {
    if (!this._w_list) return null;
    this.loadGlobalData();
    return this._data[this._w_list._index];
};

Scene_Picture_Gallery.prototype.index = function() {
    if (!this._w_list) return -1;
    return this._w_list._index;
};

Scene_Picture_Gallery.prototype.create_backgrounds = function() {
    this._picture = new Sprite();
    this._picture._ani = [false,0,0,0];
    this.addChild(this._picture);
};

Scene_Picture_Gallery.prototype.create_window_comp = function() {
    var w = Graphics.boxWidth;
    var h = 72;
    this._w_comp = new Window_PictureComp(0, 0, w, h);
    this.addChild(this._w_comp);
};

Scene_Picture_Gallery.prototype.create_window_list = function() {
    var w = Graphics.boxWidth;
    var h = Graphics.boxHeight - this._w_comp.height;
    var y = this._w_comp.height;
    this._w_list = new Window_PictureList(0, y, w, h, this._picture_cache, this._no_data_pic);
    this._w_list.setHandler('cancel', this.popScene.bind(this));
    this.addChild(this._w_list);
};

Scene_Picture_Gallery.prototype.refresh_data = function() {
    this.loadGlobalData();
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

Scene_Picture_Gallery.prototype.set_new_data = function() {
    this.show[0] = true;
    if (this._info) this._info._phase[0] = 1;
    this.press_cancel[1] = 20;
    var w = this._picture_data[this.index()][0];
    var h = this._picture_data[this.index()][1];
    this._pxy = [(Graphics.boxWidth - w)/2, (Graphics.boxHeight - h)/2, Graphics.boxWidth - w, Graphics.boxHeight - h];
    this._pxy[0] = this._pxy[0].clamp(this._pxy[2], 0);
    this._pxy[1] = this._pxy[1].clamp(this._pxy[3], 0);
    this._picture.bitmap = this._picture_cache[this.index()];
    this._picture.anchor.x = 0;
    this._picture.anchor.y = 0;
    this._picture.opacity = 0;
    this._picture.scale.x = 1;
    this._picture.scale.y = 1;
    if (this.limitX() > 0) this._picture.anchor.x = 0.5;
    if (this.limitY() > 0) this._picture.anchor.y = 0.5;
    this._fullMode = false;
};

Scene_Picture_Gallery.prototype.set_FullMode = function() {
    this._fullMode = true;
    this._pxy_old = [this._pxy[0], this._pxy[1], this._picture.anchor.x, this._picture.anchor.y, this._picture.scale.x];
    this._pxy[0] = Graphics.boxWidth/2;
    this._pxy[1] = Graphics.boxHeight/2;
    this._picture.anchor.x = 0.5;
    this._picture.anchor.y = 0.5;
    var pic_w = Graphics.boxWidth;
    var pic_h = Graphics.boxHeight;
    this._picture.scale.x = pic_w / this._picture.width;
    this._picture.scale.y = pic_h / this._picture.height;
};

Scene_Picture_Gallery.prototype.set_NormalMode = function() {
    this._fullMode = false;
    this._pxy[0] = this._pxy_old[0];
    this._pxy[1] = this._pxy_old[1];
    this._picture.anchor.x = this._pxy_old[2];
    this._picture.anchor.y = this._pxy_old[3];
    this._picture.scale.x = this._pxy_old[4];
    this._picture.scale.y = this._pxy_old[4];
};

Scene_Picture_Gallery.prototype.changePictureMode = function() {
    SoundManager.playCursor();
    if (!this._fullMode) this.set_FullMode();
    else this.set_NormalMode();
};

Scene_Picture_Gallery.prototype.set_zoom = function(value) {
    if (this._fullMode) return;
    this._picture.scale.x += value;
    if (this._picture.scale.x > 1.5) this._picture.scale.x = 1.5;
    if (this._picture.scale.x < 1) this._picture.scale.x = 1;
    this._picture.scale.y = this._picture.scale.x;
};

Scene_Picture_Gallery.prototype.nodata_effect = function() {
    SoundManager.playBuzzer();
    this.show[0] = false;
    this._playing_index = this.index();
};

Scene_Picture_Gallery.prototype.update_window = function() {
    if (this.show[1] > 0) this.show[1]--;
    this._w_list.active = !this.show[0];
    if (this.show[0]) {
        this._w_list.opacity -= 100;
        this._w_list.contentsOpacity -= 25;
        this._picture.opacity += 15;
    } else {
        this._w_list.opacity += 25;
        this._w_list.contentsOpacity += 25;
        if (Imported.MOG_MenuBackground && this._w_list.opacity >= Moghunter.mback_opacity) {
            this._w_list.opacity = Moghunter.mback_opacity;
        }
        this._picture.opacity -= 15;
    }
    this._w_comp.opacity = this._w_list.opacity;
    this._w_comp.contentsOpacity = this._w_list.contentsOpacity;
    if (this._backgroundSpriteNew) this._backgroundSpriteNew.opacity = this._w_list.contentsOpacity;
};

Scene_Picture_Gallery.prototype.updatePictureAnimation = function() {
    this._picture.opacity -= 15;
    this._picture.scale.x += 0.01;
    this._picture.scale.y = this._picture.scale.x;
    if (this._picture.opacity <= 0) {
        this._picture._ani[0] = false;
        this.refresh_data();
    }
};

Scene_Picture_Gallery.prototype.update_input_for_picture = function() {
    this.update_Input();
    this.update_TouchInput();
    this.update_picture_position();
};

Scene_Picture_Gallery.prototype.update_picture_position = function() {
    if (this._pxy[2] <= 0) this._picture.x = this._pxy[0];
    else this._picture.x = Graphics.boxWidth/2;
    if (this._pxy[3] <= 0) this._picture.y = this._pxy[1];
    else this._picture.y = Graphics.boxHeight/2;
    this._picture.scale.y = this._picture.scale.x;
};

Scene_Picture_Gallery.prototype.update_Input = function() {
    if (this.needReturnToList()) this.return_to_data_list();
    if (Input.isPressed("right")) this.move_to(0, -this.move_speed());
    if (Input.isPressed("left")) this.move_to(0, this.move_speed());
    if (Input.isPressed("down")) this.move_to(1, -this.move_speed());
    if (Input.isPressed("up")) this.move_to(1, this.move_speed());
    if (Input.isTriggered(this._fit_screen_key)) this.changePictureMode();
    if (Input.isTriggered(this._wallpaper_key)) this.setBackground();
};

Scene_Picture_Gallery.prototype.needReturnToList = function() {
    if (TouchInput.isCancelled() && !TouchInput.isPressed()) return true;
    if (Input.isTriggered("cancel")) return true;
    if (Input.isTriggered("ok")) return true;
    return false;
};

Scene_Picture_Gallery.prototype.return_to_data_list = function() {
    SoundManager.playCancel();
    if (this._info) this._info._phase[0] = 0;
    this.refresh_data();
};

Scene_Picture_Gallery.prototype.setBackground = function() {
    var fileName;
    if (Moghunter.picturegallery_global_unlock) {
        var dataArr = MOG_PictureGallery_Global.getDataArray();
        fileName = dataArr[this._w_list._index][1];
    } else {
        if ($gameSystem._useCustomPictureList) {
            fileName = this._data[this._w_list._index][1];
        } else {
            fileName = String(Moghunter.picturegallery_file_name + (this._w_list._index + 1));
        }
    }
    $gameSystem._backgroundName = fileName;
    this.set_FullMode();
    if (this._info) this._info._phase[0] = 0;
    this._picture._ani[0] = true;
    SoundManager.playOk();
};

Scene_Picture_Gallery.prototype.setWheelAction = function() {
    this._wheel_d = 5;
    if (Imported.MOG_MenuBackground && this._wallpaper) {
        if (TouchInput.wheelY > 0) this.changePictureMode();
        else this.setBackground();
    } else {
        this.changePictureMode();
    }
};

Scene_Picture_Gallery.prototype.update_TouchInput = function() {
    if (TouchInput.isTriggered() && this.press_cancel[0] > 0 && this.press_cancel[1] === 0) {
        this.return_to_data_list();
    }
    if (this._wheel_d > 0) this._wheel_d--;
    if (this._wheel_d === 0 && TouchInput.wheelY !== 0) this.setWheelAction();
    if (TouchInput.isPressed()) {
        if (TouchInput.isCancelled()) this.setBackground();
        this.press_cancel[0] = Moghunter.picturegallery_double_click_speed;
        this._moveTo_TouchInput();
    } else {
        this._txv = null;
    }
};

Scene_Picture_Gallery.prototype._moveTo_TouchInput = function() {
    if (this._fullMode) return;
    if (!this._txv) {
        this._txv = [this._picture.x + TouchInput._x, this._picture.y + TouchInput._y];
        this._mxy[0] = TouchInput._x - this._txv[0];
        this._mxy[1] = TouchInput._y - this._txv[1];
    }
    var mv = this._mxy[0] - (TouchInput._x - this._txv[0]);
    this.move_to(0, -mv);
    mv = this._mxy[1] - (TouchInput._y - this._txv[1]);
    this.move_to(1, -mv);
    this._mxy[0] = TouchInput._x - this._txv[0];
    this._mxy[1] = TouchInput._y - this._txv[1];
};

Scene_Picture_Gallery.prototype.needUpdateInput = function() {
    if (this.show[1] !== 0) return false;
    if (this._w_list.active) return false;
    if (this._picture._ani[0]) return false;
    return true;
};

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

Scene_Picture_Gallery.prototype.updateInfo = function() {
    if (this._info._phase[0] !== this._info._phase[1]) this.refreshInfo();
    if (this._info._phase[2] === 0) {
        this._info.opacity += 5;
        if (this._info.y < this._info.org[1]) {
            this._info.y += 3;
            if (this._info.y > this._info.org[1]) this._info.y = this._info.org[1];
        }
        if (this._info.opacity >= 255) this._info._phase[2] = 1;
    } else if (this._info._phase[2] === 1) {
        this._info.y = this._info.org[1];
        this._info._duration--;
        if (this._info._duration <= 0) this._info._phase[2] = 2;
    } else {
        if (this._info.opacity > 0) {
            this._info.opacity -= 5;
            this._info.y -= 3;
        }
    }
};

Scene_Picture_Gallery.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
     if (!this._w_list) {
        this.refresh_picture_data();
    }
    if (!this.data()) return;
    if (this._w_list && this._w_list._check_data) this.refresh_data();
    if (!this._picture._ani[0]) {
        this.update_window();
    } else {
        this.updatePictureAnimation();
    }
    if (this.needUpdateInput()) this.update_input_for_picture();
    if (this._info && this._info.bitmap && this._info.bitmap.isReady()) this.updateInfo();
    if (this.press_cancel[0] > 0) this.press_cancel[0]--;
    if (this.press_cancel[1] > 0) this.press_cancel[1]--;
};