import React, { useState } from 'react';
import { Form, Button, ListGroup, InputGroup } from 'react-bootstrap';

interface CategoriesFormProps {
  initialCategories?: string[];
  onSave?: (updatedCategories: string[]) => void;
}

const Categoriesform: React.FC<CategoriesFormProps> = ({
  initialCategories = ['Marketing', 'Development', 'Support'],
  onSave,
}) => {
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const handleDelete = (categoryToDelete: string) => {
    setCategories(categories.filter((cat) => cat !== categoryToDelete));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(categories);
    console.log('Saved Categories:', categories);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Add New Category</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="e.g. Sales, HR, QA"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button variant="outline-primary" onClick={handleAddCategory}>
            Add
          </Button>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Existing Categories</Form.Label>
        {categories.length > 0 ? (
          <ListGroup>
            {categories.map((cat) => (
              <ListGroup.Item
                key={cat}
                className="d-flex justify-content-between align-items-center"
              >
                {cat}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(cat)}
                >
                  ✕
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="text-muted">No categories yet.</p>
        )}
      </Form.Group>

      <Button type="submit" variant="custom">
        Save Changes
      </Button>
    </Form>
  );
};

export default Categoriesform;
