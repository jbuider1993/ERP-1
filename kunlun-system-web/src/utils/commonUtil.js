
export function sendRequestToHome(isAddRoute, key, params) {
  window.parent.postMessage(JSON.stringify({isAddRoute, key, params }), "*");
}

export function parseProcessNode(model) {
  let obj = {};
  const childrens = model.model.childShapes;
  let nodes = childrens.filter(item => item.properties.overrideid);
  nodes = nodes.splice(1, nodes.length - 2);
  const modelNodeList = nodes.map(item => {
    let model = {};
    model.id = item.properties.overrideid;
    model.name = item.properties.name;
    return model;
  });
  obj.name = model.name;
  obj.modelNodes = modelNodeList;
  return obj;
}

export const unfoldAllNode = (list, unfoldCollapseKeys) => {
  for (let i = 0; i < list.length; i++) {
    const children = list[i].children;
    unfoldCollapseKeys.push(list[i].id);

    if (children && children.length > 0) {
      unfoldAllNode(children, unfoldCollapseKeys);
    }
  }
}
