import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  MiniMap,
  useEdgesState,
  useNodesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Panel,
  NodeProps,
  Handle,
  Position
} from 'reactflow';
import { Info, Plus } from 'lucide-react';
import "reactflow/dist/style.css";
import axios from 'axios';
import { DATABASE_URL } from '@/config';
import { useRecoilState, useRecoilValue } from 'recoil';
import { childatom, parentid, todoatom } from '@/Atoms/Atoms';

const GradientCardNode = ({ data }: NodeProps) => {
  return (
    <div className="relative pl-4 min-w-[200px]">
      {/* Add source handle at the top */}
      <Handle
        type="source"
        position={Position.Top}
        className="w-2 h-2 bg-blue-500"
      />
      
      {/* Add target handle at the bottom */}
      <Handle
        type="target"
        position={Position.Bottom}
        className="w-2 h-2 bg-blue-500"
      />

      <svg 
        className="absolute blur-lg w-full top-0 left-0 -z-10" 
        style={{ 
          height: '150%',
          minHeight: '400px'
        }} 
        preserveAspectRatio="xMidYMin slice" 
        viewBox="0 0 283 290" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 20C0 8.9543 8.9543 0 20 0H151H216H249.5H263C274.046 0 283 8.95431 283 20V270C283 281.046 274.046 290 263 290H20C8.95431 290 0 281.046 0 270V20Z"
          fill="url(#paint0_linear_98_2)"
        />
        <g clipPath="url(#paint1_angular_98_2_clip_path)">
          <g transform="matrix(-0.1225 0.178 -0.178 -0.1225 122.5 112)">
            <foreignObject x="-1085.33" y="-1085.33" width="2170.67" height="2170.67">
              <div
                style={{
                  background:
                    "conic-gradient(from 90deg, rgba(166, 20, 44, 0.3158) 0deg, rgba(190, 22, 22, 0.2) 12.8811deg, rgba(19, 0, 127, 1) 61.2748deg, rgba(0, 0, 0, 1) 186.719deg, rgba(28, 2, 173, 1) 283.916deg, rgba(166, 20, 44, 0.3158) 360deg)",
                  height: "100%",
                  width: "100%",
                  opacity: 1,
                }}
              />
            </foreignObject>
          </g>
        </g>
        <path
          d="M0 20C0 8.9543 8.9543 0 20 0H110.52C127.089 0 136.472 18.9917 126.405 32.1515L113.28 49.3104C100.44 66.0956 119.02 88.7324 137.986 79.4115L266 16.5C273.235 11.6055 283 16.789 283 25.5244V270C283 281.046 274.046 290 263 290H20C8.95431 290 0 281.046 0 270V20Z"
        />
        <defs>
          <clipPath id="paint1_angular_98_2_clip_path">
            <path d="M0 20C0 8.9543 8.9543 0 20 0H110.52C127.089 0 136.472 18.9917 126.405 32.1515L113.28 49.3104C100.44 66.0956 119.02 88.7324 137.986 79.4115L266 16.5V16.5C273.235 11.6055 283 16.789 283 25.5244V270C283 281.046 274.046 290 263 290H20C8.95431 290 0 281.046 0 270V20Z" />
          </clipPath>
          <linearGradient id="paint0_linear_98_2" x1="150" y1="118.5" x2="422" y2="-179" gradientUnits="userSpaceOnUse">
            <stop stopColor="#000FB9" />
            <stop offset="0.295" stopColor="#D1466D" />
            <stop offset="0.640786" stopColor="#FF0048" />
          </linearGradient>
        </defs>
      </svg>
      <div className='flex h-full justify-between z-10 relative'>
      <div className="text-white my-2 font-kubo ">
        {data.label}
      </div>
      <div className='h-full w-5 flex my-2 justify-center bg-green-600'>
        <Info className='w-3 stroke-black'/>
      </div>
      </div>
    </div>
  );
};

const nodeTypes = {
  gradientCard: GradientCardNode
};

const shaderTypes = [
  "Principled BSDF",
  "Shader to RGB",
  "Color Ramp",
  "Noise Texture",
  "Displacement",
  "Material Output"
];

const userNodes = [{
  id: "1",
  type: 'gradientCard',
  data: { label: "Uni" },
  position: { x: 450, y: 0 },
  className:'absolute overflow-hidden'
}];

const ShaderNodeFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(userNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);  
  const [selectedNode, setSelectedNode] = useState(shaderTypes[0]);
  const userid = useRecoilValue(parentid);
  const [todo, settodo] = useRecoilState(todoatom);
  const [child, setchild] = useRecoilState(childatom);

  async function fetchNodes() {
    try {
      const response = await axios.post(`${DATABASE_URL}/api/v2/Todos/Child`, {
        parentId: 28,
      });
  
      const newChildren = response.data.Todos;
      setchild(newChildren);
  
      setNodes((prevNodes) => [
        ...prevNodes,
        ...newChildren.map((data: any) => ({
          id: data.id.toString(),
          type: 'gradientCard',
          data: { label: data.name },
          position: { x: Math.random() * 600, y: Math.random() * 400 },
          className:'absolute overflow-hidden'
        })),
      ]);
  
      setEdges((prevEdges) => [
        ...prevEdges,
        ...newChildren.map((data: any) => ({
          id: `e1-${data.id}`,
          target: "1",
          source: data.id.toString(),
          type: 'default',
          animated: true,
          className: "stroke-white"
        })),
      ]);
    } catch (error) {
      console.error("Error fetching nodes:", error);
    }
  }
  
  useEffect(() => {
    axios.post(`${DATABASE_URL}/api/v2/Todos/Parent`, {
      userId: userid
    }).then(response => {
      settodo(response.data.Todos);
    })
  }, [todoatom, userid]);

  useEffect(() => {
    fetchNodes();
  }, [])

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge({ 
      ...params, 
      type: 'default',
      animated: true, 
      className: 'stroke-white'
    }, eds)),
    [setEdges]
  );

  const addNode = useCallback(() => {
    const newNode: Node = {
      id: `${nodes.length + 1}-${Date.now()}`,
      type: 'gradientCard',
      data: { label: selectedNode },
      position: {
        x: Math.random() * 500,
        y: Math.random() * 300,
      }
    };
    setNodes((nds) => [...nds, newNode]);
  }, [nodes, selectedNode, setNodes]);

  return (
    <div className="h-screen w-full bg-slate-950 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-kubo">Shader Node Flow</h2>
        <div className="flex items-center gap-4">
          <select 
            value={selectedNode}
            onChange={(e) => setSelectedNode(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded px-3 py-1"
          >
            {shaderTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button
            onClick={addNode}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
          >
            <Plus size={16} />
            Add Node
          </button>
        </div>
      </div>
      <div className="h-4/5 border border-gray-700 rounded">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-slate-950"
        >
          <Background className="bg-slate-950" />
          <MiniMap 
            className="bg-slate-800 border-gray-700" 
            nodeColor="#fff"
            maskColor="rgba(55, 65, 81, 0.5)"
          />
          <Panel position="bottom-center" className="bg-slate-950 p-2 rounded-t border border-gray-700">
            <div className="text-sm text-gray-400">
              Drag nodes to reposition • Click and drag between nodes to connect • Select node type and click Add Node to create
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};

export default ShaderNodeFlow;