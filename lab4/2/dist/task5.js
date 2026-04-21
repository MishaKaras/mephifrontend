"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TreeNode {
    value;
    left;
    right;
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class BinaryTree {
    root = null;
    insert(value) {
        this.root = this.insertNode(this.root, value);
    }
    insertNode(node, value) {
        if (node === null) {
            return new TreeNode(value);
        }
        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        }
        else if (value > node.value) {
            node.right = this.insertNode(node.right, value);
        }
        return node;
    }
    search(value) {
        return this.searchNode(this.root, value);
    }
    searchNode(node, value) {
        if (node === null)
            return false;
        if (value === node.value)
            return true;
        if (value < node.value)
            return this.searchNode(node.left, value);
        return this.searchNode(node.right, value);
    }
    delete(value) {
        this.root = this.deleteNode(this.root, value);
    }
    findMin(node) {
        if (node.left === null)
            return node;
        return this.findMin(node.left);
    }
    deleteNode(node, value) {
        if (node === null)
            return null;
        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
        }
        else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
        }
        else {
            if (node.left === null)
                return node.right;
            if (node.right === null)
                return node.left;
            const minRight = this.findMin(node.right);
            node.value = minRight.value;
            node.right = this.deleteNode(node.right, minRight.value);
        }
        return node;
    }
    update(oldValue, newValue) {
        if (this.search(oldValue)) {
            this.delete(oldValue);
            this.insert(newValue);
        }
    }
    height() {
        return this.calcHeight(this.root);
    }
    calcHeight(node) {
        if (node === null)
            return 0;
        const leftHeight = this.calcHeight(node.left);
        const rightHeight = this.calcHeight(node.right);
        return 1 + Math.max(leftHeight, rightHeight);
    }
}
//# sourceMappingURL=task5.js.map