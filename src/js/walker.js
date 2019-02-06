// A little DOM walker I made, because document.TreeWalker isn't good at
// conditionally not-traversing down a node.

export default {
    root: null,
    callback: null,

    walk(root, callback) {
        this.root = root
        this.callback = callback
        return this.start(root)
    },

    start(node) {
        if (this.callback(node) === false) {
            return this.goToNextSiblingOrUpToParent(node)
        }

        let child = this.getFirstChild(node)
        if (child) {
            return this.start(child)
        } else {
            return this.goToNextSiblingOrUpToParent(node)
        }
    },

    goToNextSiblingOrUpToParent(node) {
        let sibling = this.getNextSibling(node)
        if (sibling) {
            return this.start(sibling)
        } else {
            if (node.parentNode === this.root) {
                return
            } else {
                return this.goToNextSiblingOrUpToParent(node.parentNode)
            }
        }
    },

    getFirstChild(node) {
        const child = node.firstChild

        if (child && child.nodeType !== Node.ELEMENT_NODE) {
            return this.getFirstChild(child)
        }
        return child
    },

    getNextSibling(node) {
        const sibling = node.nextSibling

        if (sibling && sibling.nodeType !== Node.ELEMENT_NODE) {
            return this.getNextSibling(sibling)
        }
        return sibling
    },
}
