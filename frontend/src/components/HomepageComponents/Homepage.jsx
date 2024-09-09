'use client'

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSpring, animated, config } from 'react-spring';
import ScheduleCard from './ScheduleCard';
import EssaysCard from './EssayCard';

const CARD_ORDER_KEY = 'ieltsAppCardOrder';

const CardWrapper = ({ children, width = 'w-full', height = 'h-full', id, style }) => (
  <animated.div className={`${width} ${height} p-2`} id={id} style={style}>
    {children}
  </animated.div>
);

export default function Component() {
  const [cardOrder, setCardOrder] = useState(['schedule', 'missions', 'essays', 'vocabulary']);

  useEffect(() => {
    const savedOrder = localStorage.getItem(CARD_ORDER_KEY);
    if (savedOrder) {
      setCardOrder(JSON.parse(savedOrder));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CARD_ORDER_KEY, JSON.stringify(cardOrder));
  }, [cardOrder]);

  const cardAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: config.wobbly,
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newOrder = Array.from(cardOrder);
    const [reorderedItem] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, reorderedItem);

    setCardOrder(newOrder);
  };

  const renderCard = (id) => {
    switch (id) {
      case 'schedule':
        return (
          <CardWrapper width="w-full" id="schedule" style={cardAnimation}>
            <ScheduleCard />
          </CardWrapper>
        );
      case 'essays':
        return (
          <CardWrapper width="w-full" id="essays" style={cardAnimation}>
            <EssaysCard />
          </CardWrapper>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
      <div className="container mx-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="cards">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {cardOrder.map((cardId, index) => (
                  <Draggable key={cardId} draggableId={cardId} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {renderCard(cardId)}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}