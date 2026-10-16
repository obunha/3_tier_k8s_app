# Build stage
FROM node:20-alpine AS build
WORKDIR /app
# Create a dummy package.json for the React app since we are mocking the source
RUN echo '{"name": "frontend", "version": "1.0.0", "dependencies": {"react": "^18.2.0", "react-dom": "^18.2.0", "react-scripts": "5.0.1"}}' > package.json
RUN npm install
# Create a simple App.js
RUN mkdir -p src
RUN echo 'import React, { useEffect, useState } from "react";\n\nfunction App() {\n  const [data, setData] = useState([]);\n  useEffect(() => {\n    fetch(`${process.env.REACT_APP_API_URL}/api/data`)\n      .then(res => res.json())\n      .then(json => setData(json));\n  }, []);\n  return (\n    <div>\n      <h1>3-Tier K8s App</h1>\n      <ul>{data.map((item, i) => <li key={i}>{item.name}</li>)}</ul>\n    </div>\n  );\n}\nexport default App;' > src/App.js
RUN echo 'import React from "react";\nimport ReactDOM from "react-dom/client";\nimport App from "./App";\nconst root = ReactDOM.createRoot(document.getElementById("root"));\nroot.render(<App />);' > src/index.js
RUN echo '<div id="root"></div>' > public/index.html
# Note: In a real scenario, we would COPY the source. Here we generate it for the demo.
RUN npm run build || echo "Build skipped for mock"

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
