export interface MenuData { id: string; title: string; link: string; component: string | null; }
export class TreeNode {
  data: MenuData; children: TreeNode[];
  constructor(data: MenuData) { this.data = data; this.children = []; }
  addChild(node: TreeNode): void { this.children.push(node); }
}
export function seedSystemTree(): TreeNode[] {
  const tree = new TreeNode({ id: 'root', title: 'Root', link: '/', component: null });
  const settings = new TreeNode({ id: 'n-set', title: 'Settings', link: '#', component: null });
  settings.addChild(new TreeNode({ id: 's-sec', title: 'Security & Privacy', link: '/s', component: 'Sec' }));
  settings.addChild(new TreeNode({ id: 's-pwd', title: 'Password', link: '/p', component: 'Pass' }));
  tree.addChild(new TreeNode({ id: 'n-prof', title: 'Profile', link: '/pr', component: 'Prof' }));
  tree.addChild(settings);
  tree.addChild(new TreeNode({ id: 'n-out', title: 'Logout', link: '/l', component: 'Out' }));
  return tree.children;
}
