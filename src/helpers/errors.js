export const errorFetchData = (dataType, container) => {
  container.remove();
  const errorMsg = document.createElement("div");
  errorMsg.className = "errorMsg";
  errorMsg.innerHTML = `${dataType} data is empty or doesn't exist. Please provide correct ${dataType}`;

  document.body.appendChild(errorMsg);
};

export const errorAreas = (container) => {
  container.remove();
  const errorMsg = document.createElement("div");
  errorMsg.className = "errorMsg";
  errorMsg.innerHTML =
    "Blocks area is more than container area. Please increase width and/or heigh of container";

  document.body.appendChild(errorMsg);
};

export const errorMaxBlockSizes = (container, title) => {
  container.remove();
  const errorMsg = document.createElement("div");
  errorMsg.className = "errorMsg";
  errorMsg.innerHTML = `Impossible to fit the block #${title}. Its width or heigh is more than width and heigh of container`;

  document.body.appendChild(errorMsg);
};
