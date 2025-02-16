import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Panel
} from 'reactflow';
import { Plus } from 'lucide-react';
import "reactflow/dist/style.css";
import axios from 'axios';
import { DATABASE_URL } from '@/config';
import { useRecoilState, useRecoilValue } from 'recoil';
import { childatom, parentid, todoatom } from '@/Atoms/Atoms';

const nodeTypes = [
  "Principled BSDF",
  "Shader to RGB",
  "Color Ramp",
  "Noise Texture",
  "Displacement",
  "Material Output"
];

const userEdges=[
  { id: "e1-2", source: "1", target: "2", animated: true, className: 'stroke-red' },
]
const userNodes=[{
  id:"1",
data:{label:"Uni"},
position:{x: 450, y:0},
className: 'bg-purple-800 text-white rounded-lg border-2 border-gray-600 shadow-lg'
}]
const initialNodes = [
  { 
    id: "1", 
    type: "input", 
    data: { label: "Principled BSDF" }, 
    position: { x: 450, y: 0 },
    className: 'bg-gray-800 text-white rounded-lg border-2 border-gray-600 shadow-lg'
  },
  { 
    id: "2", 
    data: { label: "Shader to RGB" }, 
    position: { x: 250, y: 100 },
    className: 'bg-gray-800 text-white rounded-lg border-2 border-gray-600 shadow-lg'
  },
  { 
    id: "3", 
    data: { label: "Color Ramp" }, 
    position: { x: 250, y: 250 },
    className: 'bg-gray-800 text-white rounded-lg border-2 border-gray-600 shadow-lg'
  },
  { 
    id: "4", 
    data: { label: "Noise Texture" }, 
    position: { x: 250, y: 250 },
    className: 'bg-gray-800 text-white rounded-lg border-2 border-gray-600 shadow-lg'
  },
  { 
    id: "5", 
    data: { label: "Displacement" }, 
    position: { x: 450, y: 150 },
    className: 'bg-gray-800 text-white rounded-lg border-2 border-gray-600 shadow-lg'
  },
  { 
    id: "6", 
    type: "output", 
    data: { label: "Material Output" }, 
    position: { x: 650, y: 200 },
    className: 'bg-gray-800 text-white rounded-lg border-2 border-gray-600 shadow-lg'
  },{ 
    id: "7", 
    type: "output", 
    data: { label: "Material Output" }, 
    position: { x: 650, y: 100 },
    className: 'bg-purple-800 text-white rounded-lg border-2 border-gray-600 shadow-lg'
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true, className: 'stroke-red' },
  { id: "e2-3", source: "2", target: "3", animated: true, className: 'stroke-white' },
  { id: "e3-6", source: "3", target: "6", animated: true, className: 'stroke-white' },
  { id: "4-5", source: "4", target: "5", animated: true, className: 'stroke-white' },
  { id: "5-6", source: "5", target: "6", animated: true, className: 'stroke-white' },
  { id: "1-7", source: "1", target: "7", animated: true, className: 'stroke-white' },
];

const ShaderNodeFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(userNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);  
  const [selectedNode, setSelectedNode] = useState(nodeTypes[0]);
  const userid = useRecoilValue(parentid);
  const [todo,settodo]= useRecoilState(todoatom);
  const [child , setchild] = useRecoilState(childatom);

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
          data: { label: data.name },
          position: { x: Math.random() * 600, y: Math.random() * 400 },
          className: "bg-green-600 text-white rounded-lg border-2 border-gray-600 shadow-lg",
        })),
      ]);
  
      setEdges((prevEdges) => [
        ...prevEdges,
        ...newChildren.map((data: any) => ({
          id: `e1-${data.id}`,
          source: "1",
          target: data.id.toString(),
          animated: true,
          className: "stroke-red",
        })),
      ]);
    } catch (error) {
      console.error("Error fetching nodes:", error);
    }
  }
  
  useEffect(()=>{
    axios.post(`${DATABASE_URL}/api/v2/Todos/Parent`,{
        userId:userid
    }).then(response=>{
        settodo(response.data.Todos);
        console.log(response.data.Todos);
    })
},[todoatom,userid]);

useEffect(()=>{
  fetchNodes();
},[])
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge({ ...params, animated: true, className: 'stroke-white' }, eds)),
    [setEdges]
  );

  const addNode = useCallback(() => {
    const newNode: Node = {
      id: `${nodes.length + 1}-${Date.now()}`,
      data: { label: selectedNode },
      position: {
        x: Math.random() * 500,
        y: Math.random() * 300,
      },
      className: 'bg-purple-700 bg-gray-800 text-white rounded-lg border-2 border-gray-600 shadow-lg'
    };
    setNodes((nds) => [...nds, newNode]);
  }, [nodes, selectedNode, setNodes]);

  return (
    <div className="h-screen w-full bg-slate-950 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Shader Node Flow</h2>
        <div className="flex items-center gap-4">
          <select 
            value={selectedNode}
            onChange={(e) => setSelectedNode(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded px-3 py-1"
          >
            {nodeTypes.map((type) => (
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
          fitView
          className="bg-slate-950"
        >
          <Background className="bg-slat-950" />
          <MiniMap 
            className="bg-slate-800 border-gray-700" 
            nodeColor="#fff"
            maskColor="rgba(55, 65, 81, 0.5)"
          />
          <Controls className="fill-white stroke-white" />
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