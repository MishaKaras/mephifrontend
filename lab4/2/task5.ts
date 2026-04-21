class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
    private root: TreeNode | null = null;

    insert(value: number): void {
        this.root = this.insertNode(this.root, value);
    }

    private insertNode(node: TreeNode | null, value: number): TreeNode {
        if (node === null) {
            return new TreeNode(value);
        }
        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.insertNode(node.right, value);
        }
        return node;
    }

    search(value: number): boolean {
        return this.searchNode(this.root, value);
    }

    private searchNode(node: TreeNode | null, value: number): boolean {
        if (node === null) return false;
        if (value === node.value) return true;
        if (value < node.value) return this.searchNode(node.left, value);
        return this.searchNode(node.right, value);
    }

    delete(value: number): void {
        this.root = this.deleteNode(this.root, value);
    }

    private findMin(node: TreeNode): TreeNode {
        if (node.left === null) return node;
        return this.findMin(node.left);
    }

    private deleteNode(node: TreeNode | null, value: number): TreeNode | null {
        if (node === null) return null;

        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
        } else {
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            const minRight = this.findMin(node.right);
            node.value = minRight.value;
            node.right = this.deleteNode(node.right, minRight.value);
        }
        return node;
    }

    update(oldValue: number, newValue: number): void {
        if (this.search(oldValue)) {
            this.delete(oldValue);
            this.insert(newValue);
        }
    }

    height(): number {
        return this.calcHeight(this.root);
    }

    private calcHeight(node: TreeNode | null): number {
        if (node === null) return 0;
        const leftHeight = this.calcHeight(node.left);
        const rightHeight = this.calcHeight(node.right);
        return 1 + Math.max(leftHeight, rightHeight);
    }
}