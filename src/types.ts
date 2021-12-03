export interface node {
  containerClasses: Set<string>;
  itemClasses: Set<string>;
  label: string;
  children: node[];
  id: number;
  depth: number;
}

export class Tree {
  root: node;
  idCount: number;

  constructor(root: node) {
    this.root = root;
    this.idCount = 1;
  }

  find(id: number): node {
    const res = this._findHelper(id, this.root);
    if (res != null) {
      return res;
    }
    throw new Error("Not Found");
  }

  _findHelper(id: number, node: node): node | null {
    if (node.id == id) {
      return node;
    }
    for (const child of node.children) {
      const res = this._findHelper(id, child);
      if (res != null) {
        return res;
      }
    }
    return null;
  }

  findParent(id: number): node {
    const res = this._findParentHelper(id, this.root);
    if (res != null) {
      return res;
    }
    throw new Error("Not Found");
  }

  _findParentHelper(id: number, node: node): node | null {
    if (node.children.findIndex((e: node) => e.id == id) > -1) {
      return node;
    }
    for (const child of node.children) {
      const res = this._findParentHelper(id, child);
      if (res != null) {
        return res;
      }
    }
    return null;
  }

  deleteNode(id: number): void {
    this._deleteHelper(id, this.root);
  }
  _deleteHelper(id: number, node: node): boolean {
    const idx = node.children.findIndex((e) => e.id == id);
    if (idx > -1) {
      node.children.splice(idx, 1);
      return true;
    }
    for (const child of node.children) {
      const res = this._deleteHelper(id, child);
      if (res) {
        return true;
      }
    }
    return false;
  }
  addChild(id: number): void {
    this.idCount++;
    const parent = this.find(id);
    const newChild: node = {
      label: "child",
      children: [],
      itemClasses: new Set(),
      containerClasses: new Set(["flex"]),
      id: this.idCount,
      depth: parent.depth + 1,
    };
    parent.children.push(newChild);
  }

  addRow(id: number): void {
    this.addChild(id);
    this.addChild(id);
    const parent = this.find(id);
    parent.containerClasses.add("flex-row");
  }
  addCol(id: number): void {
    this.addChild(id);
    this.addChild(id);
    const parent = this.find(id);
    parent.containerClasses.add("flex-col");
  }
}
