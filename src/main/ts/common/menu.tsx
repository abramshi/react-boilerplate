/**
 * Menu of electron's main process.
 */
import { app, Menu, shell, BrowserWindow, MenuItemConstructorOptions } from 'electron';

export class MenuBuilder {
    mainWindow: BrowserWindow;

    constructor(mainWindow: BrowserWindow) {
        this.mainWindow = mainWindow;
    }

    buildMenu() {
        if ( process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true' ) {
            this.setupDevelopmentEnvironment();
        }

        const template = process.platform === 'darwin'
                             ? this.buildDarwinTemplate()
                             : this.buildDefaultTemplate();

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);

        return menu;
    }

    setupDevelopmentEnvironment() {
        this.mainWindow.webContents.openDevTools();
        this.mainWindow.webContents.on('context-menu', (e, props) => {
            const { x, y } = props;

            Menu.buildFromTemplate([
                {
                    label: 'Inspect element',
                    click: () => {
                        this.mainWindow.webContents.inspectElement(x, y);
                    }
                }
            ]).popup({window: this.mainWindow});
        });
    }

    buildDarwinTemplate() {
        const subMenuAbout: MenuItemConstructorOptions = {
            label: 'CoCode',
            submenu: [
                {
                    label: 'About CoCode Presenter',
                    // selector: 'orderFrontStandardAboutPanel:'
                    role: 'about'
                },
                { type: 'separator' },
                { label: 'Services', submenu: [] },
                { type: 'separator' },
                {
                    label: 'Hide CoCode Presenter',
                    accelerator: 'Command+H',
                    // selector: 'hide:'
                    role: 'hide'
                },
                {
                    label: 'Hide Others',
                    accelerator: 'Command+Shift+H',
                    // selector: 'hideOtherApplications:'
                    role: 'hideothers:'
                },
                { label: 'Show All', /*selector: 'unhideAllApplications:'*/ role: 'unhide' },
                { type: 'separator' },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    role: 'quit'
                    // click: () => {
                    //     app.quit();
                    // }
                }
            ]
        };
        const subMenuEdit: MenuItemConstructorOptions = {
            label: 'Edit',
            submenu: [
                { label: 'Undo', accelerator: 'Command+Z', role: 'undo' },
                { label: 'Redo', accelerator: 'Shift+Command+Z', role: 'redo' },
                { type: 'separator' },
                { label: 'Cut', accelerator: 'Command+X', role: 'cut' },
                { label: 'Copy', accelerator: 'Command+C', role: 'copy' },
                { label: 'Paste', accelerator: 'Command+V', role: 'paste' },
                {
                    label: 'Select All',
                    accelerator: 'Command+A',
                    role: 'selectall:'
                }
            ]
        };
        const subMenuViewDev: MenuItemConstructorOptions = {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'Command+R',
                    role: 'reload'
                    // click: () => {
                    //     this.mainWindow.webContents.reload();
                    // }
                },
                {
                    label: 'Toggle Full Screen',
                    accelerator: 'Ctrl+Command+F',
                    role: 'togglefullscreen'
                    // click: () => {
                    //     this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
                    // }
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: 'Alt+Command+I',
                    click: () => {
                        this.mainWindow.webContents.toggleDevTools();
                    }
                }
            ]
        };
        const subMenuViewProd: MenuItemConstructorOptions = {
            label: 'View',
            submenu: [
                {
                    label: 'Toggle Full Screen',
                    accelerator: 'Ctrl+Command+F',
                    role: 'togglefullscreen'
                    // click: () => {
                    //     this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
                    // }
                }
            ]
        };
        const subMenuWindow: MenuItemConstructorOptions = {
            label: 'Window',
            submenu: [
                {
                    label: 'Minimize',
                    accelerator: 'Command+M',
                    role: 'minimize:'
                },
                { label: 'Close', accelerator: 'Command+W', role: 'close' },
                { type: 'separator' },
                { label: 'Bring All to Front', role: 'front' }
            ]
        };
        const subMenuHelp = {
            label: 'Help',
            submenu: [
                {
                    label: 'Learn More',
                    click() {
                        shell.openExternal('https://www.neoedu.com');
                    }
                },
                {
                    label: 'Documentation',
                    click() {
                        shell.openExternal(
                            'https://www.neoedu.com'
                        );
                    }
                },
                {
                    label: 'Community Discussions',
                    click() {
                        shell.openExternal('https://www.neoedu.com');
                    }
                },
                {
                    label: 'Search Issues',
                    click() {
                        shell.openExternal('https://www.neoedu.com');
                    }
                }
            ]
        };

        const subMenuView =
            process.env.NODE_ENV === 'development' ? subMenuViewDev : subMenuViewProd;

        return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
    }

    buildDefaultTemplate(): MenuItemConstructorOptions[] {
        const templateDefault = [
            {
                label: '&File',
                submenu: [
                    {
                        label: '&Open',
                        accelerator: 'Ctrl+O'
                    },
                    {
                        label: '&Close',
                        accelerator: 'Ctrl+W',
                        click: () => {
                            this.mainWindow.close();
                        }
                    }
                ]
            },
            {
                label: '&View',
                submenu:
                    process.env.NODE_ENV === 'development'
                        ? [
                            {
                                label: '&Reload',
                                accelerator: 'Ctrl+R',
                                click: () => {
                                    this.mainWindow.webContents.reload();
                                }
                            },
                            {
                                label: 'Toggle &Full Screen',
                                accelerator: 'F11',
                                click: () => {
                                    this.mainWindow.setFullScreen(
                                        !this.mainWindow.isFullScreen()
                                    );
                                }
                            },
                            {
                                label: 'Toggle &Developer Tools',
                                accelerator: 'Alt+Ctrl+I',
                                click: () => {
                                    this.mainWindow.webContents.toggleDevTools();
                                }
                            }
                        ]
                        : [
                            {
                                label: 'Toggle &Full Screen',
                                accelerator: 'F11',
                                click: () => {
                                    this.mainWindow.setFullScreen(
                                        !this.mainWindow.isFullScreen()
                                    );
                                }
                            }
                        ]
            },
            {
                label: 'Help',
                submenu: [
                    {
                        label: 'Learn More',
                        click() {
                            shell.openExternal('http://www.neoedu.com');
                        }
                    },
                    {
                        label: 'Documentation',
                        click() {
                            shell.openExternal(
                                'https://www.neoedu.com'
                            );
                        }
                    },
                    {
                        label: 'Community Discussions',
                        click() {
                            shell.openExternal('https://www.neoedu.com');
                        }
                    },
                    {
                        label: 'Search Issues',
                        click() {
                            shell.openExternal('https://www.neoedu.com');
                        }
                    }
                ]
            }
        ];

        return templateDefault;
    }
}
