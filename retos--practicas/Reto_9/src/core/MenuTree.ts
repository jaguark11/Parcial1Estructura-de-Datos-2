export interface MenuData { id: string; title: string; link: string; component: string; }
export class TreeNode {
  data: MenuData; children: TreeNode[];
  constructor(data: MenuData) { this.data = data; this.children = []; }
  addChild(node: TreeNode): void { this.children.push(node); }
}
export function seedFullTree(): TreeNode[] {
  const root = new TreeNode({ id: 'root', title: 'Root', link: '/', component: 'Home' });
  
  // Nivel 1
  const profile = new TreeNode({ id: 'prof', title: 'Profile', link: '/profile', component: 'ProfileView' });
  const messages = new TreeNode({ id: 'msg', title: 'Messages', link: '/messages', component: 'MessagesView' });
  
  const settings = new TreeNode({ id: 'set', title: 'Settings', link: '#', component: 'SettingsLayout' });
  settings.addChild(new TreeNode({ id: 's-acc', title: 'Account', link: '/acc', component: 'AccountSettings' }));
  settings.addChild(new TreeNode({ id: 's-sec', title: 'Security & Privacy', link: '/sec', component: 'SecuritySettings' }));
  settings.addChild(new TreeNode({ id: 's-pwd', title: 'Password', link: '/pwd', component: 'PasswordSettings' }));

  const help = new TreeNode({ id: 'help', title: 'Help', link: '#', component: 'HelpCenter' });
  help.addChild(new TreeNode({ id: 'h-faq', title: "FAQ's", link: '/faq', component: 'FaqView' }));

  const logout = new TreeNode({ id: 'out', title: 'Logout', link: '/logout', component: 'LogoutView' });

  root.addChild(profile);
  root.addChild(messages);
  root.addChild(settings);
  root.addChild(help);
  root.addChild(logout);
  return root.children;
}
