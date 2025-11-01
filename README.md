# List Management Interface

A modern, full-featured list management application built with Next.js, React, TypeScript, and TailwindCSS. This project was developed as a technical assignment for SavvyTech.

## Features

✅ **Complete CRUD Operations**
- Create new items with title and subtitle
- View all items with formatted creation dates
- Edit existing items
- Delete items with confirmation dialog

✅ **User Experience Enhancements**
- Modal-based forms with smooth animations
- Form validation with error messages
- Delete confirmation dialog
- Keyboard support (ESC to close modals)
- Click outside to close modals
- Empty state messaging
- LocalStorage persistence (data survives page refreshes)

✅ **Modern UI/UX**
- Clean, responsive design
- Accessible components with proper ARIA labels
- Smooth transitions and hover effects
- Dark mode ready (via TailwindCSS theme)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: Custom components built with shadcn/ui patterns
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: LocalStorage (client-side persistence)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone http://github.com/Amirrezakashipazha/savvy-tech-test
cd savvy-tech-test
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

### Docker Deployment

The project includes Docker configuration for easy deployment.

#### Prerequisites
- Docker and Docker Compose installed

#### Available Make Commands

```bash
# Show Docker configuration
make config

# Build the Docker image
make build

# Start the containers
make up

# Stop the containers
make down

# Restart the containers
make restart

# View container logs
make logs

# Open shell in container
make shell

# Clean up containers and images
make clean
```

#### Quick Start with Docker

1. Build the Docker image:
```bash
make build
```

2. Start the container:
```bash
make up
```

3. Access the application at [http://localhost:3000](http://localhost:3000)

4. Stop the container:
```bash
make down
```

## Project Structure

```
savvy-tech-test/
├── app/
│   ├── page.tsx          # Main page component
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── ui/
│   │   ├── button.tsx     # Button component
│   │   └── dialog.tsx      # Dialog/Modal component
│   ├── ListManagement.tsx  # Main list management component
│   ├── ListItem.tsx        # Individual list item component
│   ├── ItemForm.tsx        # Create/Edit form modal
│   └── DeleteConfirmation.tsx # Delete confirmation dialog
├── lib/
│   ├── types.ts           # TypeScript type definitions
│   └── utils.ts           # Utility functions
├── Dockerfile             # Docker image definition
├── docker-compose.yml     # Docker Compose configuration
├── .dockerignore          # Docker ignore file
├── Makefile               # Make commands for Docker operations
└── README.md
```

## Key Components

### ListManagement
The main component that orchestrates all CRUD operations and manages the application state.

### ItemForm
A reusable modal form component for both creating and editing items, with built-in validation.

### ListItem
Displays individual items with edit and delete actions, showing formatted creation dates.

### DeleteConfirmation
A confirmation dialog to prevent accidental deletions.

## Implementation Highlights

1. **Type Safety**: Full TypeScript implementation with proper type definitions
2. **Modular Architecture**: Clean separation of concerns with reusable components
3. **Form Validation**: Client-side validation with real-time error feedback
4. **Accessibility**: Proper ARIA labels, keyboard navigation support
5. **Persistence**: LocalStorage integration for data persistence
6. **Responsive Design**: Works seamlessly across different screen sizes

## Future Enhancements

- Server-side API integration
- Search and filter functionality
- Sorting options
- Drag-and-drop reordering
- Bulk operations
- Export/Import functionality

## License

This project was created as a technical assessment for SavvyTech.
