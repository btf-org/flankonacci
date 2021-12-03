export interface node {
  containerClasses: string[];
  itemClasses: string[];
  label: string;
  nodes: node[];
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
    const res = this.findHelper(id, this.root);
    if (res != null) {
      return res;
    }
    throw new Error("Not Found");
  }

  findHelper(id: number, node: node): node | null {
    if (node.id == id) {
      return node;
    }
    for (const child of node.nodes) {
      const res = this.findHelper(id, child);
      if (res != null) {
        return res;
      }
    }
    return null;
  }

  findParent(id: number): node {
    const res = this.findParentHelper(id, this.root);
    if (res != null) {
      return res;
    }
    throw new Error("Not Found");
  }

  findParentHelper(id: number, node: node): node | null {
    if (node.nodes.findIndex((e: node) => e.id == id) > -1) {
      return node;
    }
    for (const child of node.nodes) {
      const res = this.findParentHelper(id, child);
      if (res != null) {
        return res;
      }
    }
    return null;
  }

  deleteNode(id: number): void {
    this.deleteHelper(id, this.root);
  }
  deleteHelper(id: number, node: node): boolean {
    const idx = node.nodes.findIndex((e) => e.id == id);
    if (idx > -1) {
      node.nodes.splice(idx, 1);
      return true;
    }
    for (const child of node.nodes) {
      const res = this.deleteHelper(id, child);
      if (res) {
        return true;
      }
    }
    return false;
  }
  addChild(
    id: number,
    itemClasses: string[],
    parentContainerClasses: string[]
  ): void {
    this.idCount++;
    const parent = this.find(id);
    parent.containerClasses = parent.containerClasses.concat(
      parentContainerClasses
    );
    const newChild: node = {
      label: "child",
      nodes: [],
      itemClasses: itemClasses,
      containerClasses: ["flex"],
      id: this.idCount,
      depth: parent.depth + 1,
    };
    parent.nodes.push(newChild);
  }
}
