import { DefineComponent } from 'vue';

declare class ManipulateImageEvent implements StencilEvent {
	type: 'manipulateImage';
	nativeEvent: Event;
	move: Partial<MoveDirections>;
	scale: Partial<Scale>;
	constructor(move: Partial<MoveDirections>, scale: Partial<Scale>);
}

export interface ResizeEventParams {
	compensate?: boolean;
	preserveRatio?: boolean;
	allowedDirections?: ResizeDirections;
	respectDirection?: 'width' | 'height';
}

declare class ResizeEvent implements StencilEvent {
	type: 'resize';
	directions: ResizeDirections;
	params: ResizeEventParams;

	constructor(directions: ResizeDirections, params: ResizeEventParams);
}

declare class MoveEvent implements StencilEvent {
	type: 'move';
	directions: MoveDirections;

	constructor(directions: MoveDirections);
}

declare class DragEvent implements StencilEvent {
	type: 'drag';
	nativeEvent: Event;
	position: Point;
	previousPosition: Point;
	anchor: Point;
	element: HTMLElement;

	constructor(nativeEvent: Event, element: HTMLElement, position: Point, previousPosition: Point, anchor: Point);

	public shift(): Diff;
}

export interface Coordinates {
	width: number;
	height: number;
	top: number;
	left: number;
}

export type VisibleArea = Coordinates;

export interface Limits {
	top?: number;
	left?: number;
	right?: number;
	bottom?: number;
}

export interface SizeRestrictions {
	minWidth: number;
	maxWidth: number;
	minHeight: number;
	maxHeight: number;
	widthFrozen?: boolean;
	heightFrozen?: boolean;
}

export interface ResizeDirections {
	top: number;
	left: number;
	right: number;
	bottom: number;
}

export interface MoveDirections {
	top: number;
	left: number;
}

export interface Point {
	top: number;
	left: number;
}

export interface Size {
	width: number;
	height: number;
}
export type ImageSize = Size;
export type Boundaries = Size;

export interface Intersections {
	left: number;
	top: number;
	bottom: number;
	right: number;
}

export interface AspectRatio {
	minimum?: number;
	maximum?: number;
}

export interface StencilEvent {
	type: EventType;
}

export type EventType = 'resize' | 'move' | 'drag' | 'manipulateImage';

export interface Diff {
	left: number;
	top: number;
}

export interface TransformParams {
	coordinates: Coordinates;
	imageSize: ImageSize;
	visibleArea: VisibleArea;
}

export type Transform = ((params: TransformParams) => Partial<Coordinates>) | Partial<Coordinates>;

export interface Scale {
	factor: number;
	center: Point;
}

export interface ImageTransforms {
	rotate: number;
	flip: {
		horizontal: boolean;
		vertical: boolean;
	};
}

export interface CropperResult {
	coordinates: Coordinates;
	visibleArea: VisibleArea;
	canvas?: HTMLCanvasElement;
	image: {
		width: number;
		height: number;
		transforms: ImageTransforms;
		src: string | null;
	};
}

export declare const Cropper: DefineComponent<
  {
    src?: string;
    backgroundClass?: string;
    foregroundClass?: string;
    imageRestriction?: 'fill-area' | 'fit-area' | 'stencil' | 'none';
    defaultBoundaries?: 'fill';
    defaultPosition?: Limits;
    defaultVisibleArea?: Coordinates;
    defaultSize?: Size | ((size: { visibleArea : VisibleArea , imageSize: ImageSize }) => Size);
    stencilSize?: Size | ((size: { boundaries: Boundaries }) => Size);
    stencilProps?: {
      lines?: unknown;
      handlers?: unknown;
      movable?: boolean;
      resizable?: boolean;
      scalable?: boolean;
      aspectRatio?: number;
      previewClass?: string;
      minAspectRatio?: number;
      maxAspectRatio?: number;
      handlerComponent?: unknown;
      handlersClasses?: Record<string, string>;
    };
    stencilComponent?: string;
    canvas?: boolean | SizeRestrictions;
    debounce?: boolean;
    transitions?: boolean;
    minWidth?: number;
    minHeight?: number;
    priority?: 'visibleArea';
    sizeRestrictionsAlgorithm?: 'pixelsRestriction';
    defaultTransforms?: unknown;
  },
	{
		getResult: () => CropperResult;
		setCoordinates: (transform: Transform | Transform[]) => void;
		refresh: () => void;
		zoom: (factor: number, center?: Point) => void;
		move: (left: number, top?: number) => void;
		rotate: (angle: number) => void;
		flip: (horizontal: boolean, vertical?: boolean) => void;
		reset: () => void;
	},
  {imageSize: ImageSize, sizeRestrictions: SizeRestrictions; coordinates: Coordinates},
  {},
  {},
  {},
  {},
  {ready: () => void; change: (event: CropperResult) => void; error: () => void;}
>;

export declare const PreviewResult: DefineComponent<any>;

export declare const DraggableArea: DefineComponent<any>;

export declare const BoundingBox: DefineComponent<any>;

export declare const LineWrapper: DefineComponent<any>;

export declare const HandlerWrapper: DefineComponent<any>;

export declare const DraggableElement: DefineComponent<any>;

export declare const StencilPreview: DefineComponent<any>;

export declare const RectangleStencil: DefineComponent<any>;

export declare const CircleStencil: DefineComponent<any>;

export declare const SimpleHandler: DefineComponent<any>;

export declare const SimpleLine: DefineComponent<any>;

export declare const TransformableImage: DefineComponent<any>;

export declare const Preview: DefineComponent<
	any,
	{
		refresh: () => void;
	}
>;
