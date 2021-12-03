export interface node {
  containerClasses: Set<string>;
  itemClasses: Set<string>;
  children: node[];
  id: number;
  depth: number;
}

export class Tree {
  root: node;
  idCount: number;

  constructor() {
    this.idCount = 1;
    this.root = {
      containerClasses: new Set(["flex"]),
      itemClasses: new Set(),
      children: [],
      depth: 0,
      id: this.idCount,
    };
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

  delete(id: number): void {
    const parent = this.findParent(id);
    this._deleteNode(id);
    if (parent.children.length == 0) {
      parent.containerClasses.delete("flex-row");
      parent.containerClasses.delete("flex-col");
      parent.containerClasses.delete("flex");
    }
  }
  _deleteNode(id: number): void {
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
      children: [],
      itemClasses: new Set(),
      containerClasses: new Set(),
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
    parent.containerClasses.add("flex");
  }
  addCol(id: number): void {
    this.addChild(id);
    this.addChild(id);
    const parent = this.find(id);
    parent.containerClasses.add("flex-col");
    parent.containerClasses.add("flex");
  }

  exportHtml(): string {
    return this._exportHtmlHelper(this.root);
  }
  _exportHtmlHelper(node: node): string {
    if (node.children.length == 0) {
      return (
        "\n" +
        " ".repeat(node.depth * 4) +
        `<div class="${Array.from(
          new Set([...node.containerClasses, ...node.itemClasses])
        ).join(" ")}"></div>`
      );
    }
    let html =
      "\n" +
      " ".repeat(node.depth * 4) +
      `<div class="${Array.from(
        new Set([...node.containerClasses, ...node.itemClasses])
      ).join(" ")}">`;
    for (const child of node.children) {
      html += this._exportHtmlHelper(child);
    }
    html += "\n" + " ".repeat(node.depth * 4) + "</div>";
    return html;
  }
}
