export function formatter(sourceData, targetData) {
  if (sourceData && sourceData.length > 0) {
    sourceData.map(r => {
      if (r.category) {
        r.category.level = 1
        r.category.parentId = ''
        targetData.push(r.category)
        if (r.childrens && r.childrens.length > 0) {
          r.category.children = []
          r.childrens.map((c, index) => {
            c.level = 2
            c.parentId = r.category.id
            c.parentName = r.category.name
            c.name = c.category.name
            c.id = c.category.id
            c.index = c.category.index
            c.coverImage = c.category.coverImage
            c.isShow = c.category.isShow
            r.category.children.push(c)
            if (r.childrens[index].childrens && r.childrens[index].childrens.length > 0) {
              r.category.children[index].children = []
              r.childrens[index].childrens.map(cc => {
                cc.level = 3
                cc.parentId = c.category.id
                cc.parentName = c.category.name
                cc.name = cc.category.name
                cc.id = cc.category.id
                cc.index = cc.category.index
                cc.coverImage = cc.category.coverImage
                cc.isShow = cc.category.isShow
                r.category.children[index].children.push(cc)
              })
            }
          })
        }
      }
    })
  }

  return targetData
}
