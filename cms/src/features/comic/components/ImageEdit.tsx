import { ImagesChapter } from "models";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Props {
    images: ImagesChapter[];
    handleOnDragEnd: (result: any) => void;
    deleteImage: (index: number) => void;
}

export const ImageEdit = ({ images, handleOnDragEnd, deleteImage }: Props) => {
    return (
        <div className="w-full">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters">
                    {(provided) => (
                        <div className="space-y-4 characters" {...provided.droppableProps} ref={provided.innerRef}>
                            {images.map(({ nameFile, url }, index) => {
                                return (
                                    <Draggable key={`${nameFile}_${index}`} draggableId={nameFile} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="hover:cursor-n-resize flex justify-around shadow-md bg-white items-center gap-3 px-2 py-3 md:py-4 rounded-md border border-gray-300"
                                            >
                                                <div className="mx-2">{index + 1}</div>
                                                <img
                                                    className=" w-10 h-10 object-cover "
                                                    src={url}
                                                    alt={nameFile}
                                                />
                                                <p className="truncate flex-1">{nameFile}</p>
                                                <p
                                                    onClick={() => deleteImage(index)}
                                                    className="text-red-500 p-2 cursor-pointer"
                                                >
                                                    X
                                                </p>
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};
