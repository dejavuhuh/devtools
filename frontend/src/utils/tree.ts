interface TreeNode<T extends TreeNode<T>> {
  children?: T[]
}

export function filter<T extends TreeNode<T>>(
  tree: T[],
  predicate: (node: T) => boolean,
): T[] {
  return tree.reduce<T[]>((result, node) => {
    if (predicate(node)) {
      const children = node.children ? filter(node.children, predicate) : undefined
      result.push({ ...node, children })
    }
    return result
  }, [])
}

export function map<T extends TreeNode<T>, R extends TreeNode<R>>(
  tree: T[],
  mapper: (node: T, parent?: R) => R,
  parent?: R,
): R[] {
  return tree.map((node) => {
    const mapped = mapper(node, parent)
    const children = node.children ? map(node.children, mapper, mapped) : undefined
    return { ...mapped, children }
  })
}

export function walk<T extends TreeNode<T>>(
  tree: T[],
  visitor: (node: T) => void,
): void {
  tree.forEach((node) => {
    visitor(node)
    if (node.children) {
      walk(node.children, visitor)
    }
  })
}

export function find<T extends TreeNode<T>>(
  tree: T[],
  predicate: (node: T) => boolean,
): T | undefined {
  for (const node of tree) {
    if (predicate(node)) {
      return node
    }
    if (node.children) {
      const found = find(node.children, predicate)
      if (found) {
        return found
      }
    }
  }
}
