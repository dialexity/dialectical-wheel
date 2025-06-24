import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { 
  updateEntry, 
  addEntry, 
  removeEntry, 
  undo, 
  redo,
  reorderEntries,
  type DialecticalEntry 
} from '../store/dialecticalSlice';

export default function DataEditor() {
  const dispatch = useAppDispatch();
  const dialecticalData = useAppSelector(state => state.dialectical.data);
  const history = useAppSelector(state => state.dialectical.history);
  const historyIndex = useAppSelector(state => state.dialectical.historyIndex);
  
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);
  
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const dataEntries = Object.entries(dialecticalData);

  // Test function to update T4 statement
  const updateT4Statement = () => {
    dispatch(updateEntry({
      id: 'T4',
      entry: {
        statement: "Remote work revolutionizes global collaboration",
        positive: "Connects talent across geographical boundaries",
        negative: "Creates digital divide and timezone conflicts"
      }
    }));
  };

  // Test function to add new dialectical pair
  const addNewDialecticalPair = () => {
    const newPairNumber = Object.keys(dialecticalData).filter(key => key.startsWith('T')).length + 1;
    
    dispatch(addEntry({
      id: `T${newPairNumber}`,
      entry: {
        statement: "Climate change drives innovation",
        positive: "Forces development of sustainable technologies",
        negative: "Creates economic disruption and uncertainty"
      }
    }));
    
    dispatch(addEntry({
      id: `A${newPairNumber}`,
      entry: {
        statement: "Economic stability preserves environment",
        positive: "Steady growth enables green investments",
        negative: "Short-term profits ignore long-term costs"
      }
    }));
  };

  const handleUndo = () => {
    dispatch(undo());
  };

  const handleRedo = () => {
    dispatch(redo());
  };

  const handleRemoveEntry = (id: string) => {
    if (window.confirm(`Are you sure you want to remove ${id}?`)) {
      dispatch(removeEntry(id));
    }
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItem(id);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetId) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const currentOrder = Object.keys(dialecticalData);
    const draggedIndex = currentOrder.indexOf(draggedItem);
    const targetIndex = currentOrder.indexOf(targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const newOrder = [...currentOrder];
      
      // Remove dragged item from its current position
      newOrder.splice(draggedIndex, 1);
      
      // Insert dragged item at target position
      newOrder.splice(targetIndex, 0, draggedItem);
      
      dispatch(reorderEntries(newOrder));
    }

    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  return (
    <div style={{ 
      margin: '20px 0', 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      background: 'white'
    }}>
      <h3>Data Editor</h3>
      
      {/* Undo/Redo Controls */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '15px',
        alignItems: 'center' 
      }}>
        <button 
          onClick={handleUndo}
          disabled={!canUndo}
          style={{
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: !canUndo ? '#e9ecef' : '#6c757d',
            color: !canUndo ? '#6c757d' : 'white',
            cursor: !canUndo ? 'not-allowed' : 'pointer'
          }}
        >
          ↶ Undo
        </button>
        
        <button 
          onClick={handleRedo}
          disabled={!canRedo}
          style={{
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: !canRedo ? '#e9ecef' : '#6c757d',
            color: !canRedo ? '#6c757d' : 'white',
            cursor: !canRedo ? 'not-allowed' : 'pointer'
          }}
        >
          ↷ Redo
        </button>
        
        <span style={{ 
          marginLeft: '10px', 
          fontSize: '12px', 
          color: '#666' 
        }}>
          History: {historyIndex + 1} / {history.length}
        </span>
      </div>

      {/* Test Controls */}
      <div style={{ 
        margin: '15px 0', 
        padding: '15px', 
        border: '2px solid #007bff', 
        borderRadius: '8px',
        background: '#f8f9ff'
      }}>
        <h4>Test Data Flow</h4>
        <p>Current T4 statement: <strong>{dialecticalData.T4?.statement || 'N/A'}</strong></p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={updateT4Statement}
            style={{
              padding: '10px 20px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Update T4 Statement
          </button>
          <button 
            onClick={addNewDialecticalPair}
            style={{
              padding: '10px 20px',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Add New Pair
          </button>
        </div>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Current entries: {Object.keys(dialecticalData).length} total
        </p>
      </div>

      {/* Current Data Display with Drag and Drop */}
      <div style={{ marginTop: '15px' }}>
        <h4>Current Dialectical Data: <span style={{ fontSize: '12px', color: '#666' }}>(Drag to reorder)</span></h4>
        <div style={{ 
          maxHeight: '400px', 
          overflowY: 'auto',
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '10px'
        }}>
          {dataEntries.map(([id, entry]) => (
            <div 
              key={id}
              draggable
              onDragStart={(e) => handleDragStart(e, id)}
              onDragOver={(e) => handleDragOver(e, id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, id)}
              onDragEnd={handleDragEnd}
              style={{ 
                marginBottom: '10px', 
                padding: '10px',
                background: draggedItem === id ? '#e3f2fd' : 
                           dragOverItem === id ? '#f3e5f5' : '#f8f9fa',
                borderRadius: '4px',
                border: dragOverItem === id ? '2px dashed #9c27b0' : '1px solid #e9ecef',
                cursor: 'move',
                transition: 'all 0.2s ease',
                transform: draggedItem === id ? 'rotate(2deg) scale(1.02)' : 'none',
                opacity: draggedItem === id ? 0.8 : 1
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '5px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ 
                    fontSize: '16px', 
                    color: '#666',
                    cursor: 'grab'
                  }}>
                    ⋮⋮
                  </span>
                  <strong>{id}</strong>
                </div>
                <button
                  onClick={() => handleRemoveEntry(id)}
                  style={{
                    padding: '2px 6px',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Remove
                </button>
              </div>
              <div style={{ fontSize: '14px' }}>
                <div><strong>Statement:</strong> {entry.statement}</div>
                <div><strong>Positive:</strong> {entry.positive}</div>
                <div><strong>Negative:</strong> {entry.negative}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 