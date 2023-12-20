export const errorFetchData = (dataType, container) => {
  container.remove();
  const tag = document.createElement("div");
  tag.className = "tag";
  tag.innerHTML = `${dataType} data is empty or doesn't exist. Please provide correct ${dataType}`;

  document.body.appendChild(tag);
};

export const errorAreas = (container) => {
  container.remove();
  const tag = document.createElement("div");
  tag.className = "tag";
  tag.innerHTML =
    "Blocks area is more than container area. Please increase width and/or heigh of container";

  document.body.appendChild(tag);
};

export const errorMaxBlockSizes = (container, title) => {
  container.remove();
  const tag = document.createElement("div");
  tag.className = "tag";
  tag.innerHTML = `Impossible to fit the block #${title}. Its width or heigh is more than width and heigh of container`;

  document.body.appendChild(tag);
};
