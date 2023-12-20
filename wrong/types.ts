export interface IBlock {
  width: number;
  height: number;
}

export interface IContainer extends IBlock {}

export interface IBlockCoordinate {
  top: number;
  left: number;
  right: number;
  bottom: number;
  initialOrder: number;
}

export interface IResult {
  fullness: number;
  blockCoordinates: IBlockCoordinate[];
}
