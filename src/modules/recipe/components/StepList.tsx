import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Step } from "../../../interfaces";
import { StepItem } from "./StepItem";

type StepListProps = {
  steps: Step[];
  recipeId: number;
  onReorder: (recipeId: number, newSteps: Step[]) => void;
};

export const StepList = ({ recipeId, steps, onReorder }: StepListProps) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = steps.findIndex((s) => s.id === active.id);
      const newIndex = steps.findIndex((s) => s.id === over.id);
      const newSteps = arrayMove(steps, oldIndex, newIndex);
      onReorder(recipeId, newSteps);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={steps.map((s) => s.id)}
        strategy={verticalListSortingStrategy}
      >
        {steps
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((step) => (
            <SortableStep key={step.id} step={step} recipeId={recipeId} />
          ))}
      </SortableContext>
    </DndContext>
  );
};

const SortableStep = ({ step, recipeId }: { step: Step; recipeId: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <StepItem
        recipeId={recipeId}
        step={step}
        dragHandleProps={{ ...listeners, ...attributes }}
      />
    </div>
  );
};
