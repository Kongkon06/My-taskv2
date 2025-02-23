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
import { Info, Plus, X } from 'lucide-react';
import "reactflow/dist/style.css";
import axios from 'axios';
import { DATABASE_URL } from '@/config';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { childatom, parentid, todoatom } from '@/Atoms/Atoms';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const SvG = () => {
  return (
    <svg 
        className="absolute blur-lg w-full top-0 left-0 z-10" 
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
  );
};


const GradientCardNode = ({ data,id }: NodeProps) => {
  const setParentId = useSetRecoilState(parentid);
  const navigate = useNavigate();
  return (
    <div className="relative p-4 min-w-[200px] rounded-lg overflow-hidden shadow-lg bg-black border border-gray-800">
      <SvG />
      {/* Top source handle */}
      <Handle type="source" position={Position.Top} className="w-2 h-2 bg-blue-500 z-10" />
      {/* Bottom target handle */}
      <Handle type="target" position={Position.Bottom} className="w-2 h-2 bg-blue-500 z-10" />
      
      <div className="relative flex justify-between gap-12 items-center z-10">
        <div role='button' onClick={()=>{setParentId(Number(id));navigate(`/plans/${data.label}`)}} className="text-white font-kubo">{data.label}</div>
        <div className={`h-6 w-6 flex items-center justify-center ${data.hasChild ? "bg-blue-600" : "bg-green-600"} rounded-full`}>
          <Info className="w-4 h-4 stroke-black" />
        </div>
      </div>
    </div>
  );
};


const nodeTypes = {
  gradientCard: GradientCardNode
};



const TaskPlanner = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [taskName, setTaskName] = useState('');
  const [isCreating, setIsCreating] = useState(false);  
  const parentTask = useRecoilValue(todoatom);
  const userid = useRecoilValue(parentid);
  const setchild = useSetRecoilState(childatom);

  async function fetchNodes() {
    try {
      const response = await axios.post(`${DATABASE_URL}/api/v2/Todos/Child`, {
        parentId: userid,
      });
      const newChildren = response.data.Todos;
      setchild(newChildren);
  
      setNodes((prevNodes) => [
        ...prevNodes,
        ...newChildren.map((data: any) => ({
          id: data.id.toString(),
          type: 'gradientCard',
          data: { label: data.name, hasChild:(data.subTodos.length != 0 ? true : false) },
          position: { x: Math.random() * 600, y: Math.random() * 400 },
          className:'absolute'
        })),
      ]);
  
      setEdges((prevEdges) => [
        ...prevEdges,
        ...newChildren.map((data: any) => ({
          id: `e1-${data.id}`,
          target: userid.toString(),
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
    parentTask.map((task)=>{
      if(task.id == userid){
        setNodes((prevNodes) => [
          ...prevNodes,{
            id: userid.toString(),
            type: 'gradientCard',
            data: { label: task.name,hasChild:(task.subTodos.length != 0 ? true : false) },
            position:  { x: 450, y: 0 },
            className:'absolute '
          },
        ]);
      }
    })
    fetchNodes();
  }, [userid])

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
    if (!taskName.trim()) return; // Prevent empty task names
    
    setIsCreating(true);
    
    const newNodeId = `${Date.now()}`; // Generate a unique ID
    const newNode: Node = {
      id: newNodeId,
      type: 'gradientCard',
      data: { label: taskName, hasChild: false },
      position: {
        x: Math.random() * 500,
        y: Math.random() * 300,
      },
    };
  
    setNodes((nds) => [...nds, newNode]);
  
  
    setIsCreating(false);
    setTaskName(""); // Reset input field
  }, [nodes, setNodes, setEdges, taskName]);
  

  return (
    <div className="h-screen w-full bg-slate-950 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-kubo">Task Map</h2>
        <div className="flex items-center gap-4">
        <div className="relative flex items-center">
              <Input
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="pr-10 bg-slate-900 border-slate-700 focus:border-blue-500 transition-colors"
                placeholder="Enter Task Name..."
              />
              {taskName && (
                <X
                  size={16}
                  className="absolute right-3 cursor-pointer text-gray-400 hover:text-white transition-colors"
                  onClick={() => setTaskName('')}
                />
              )}
            </div>
            <Button
              onClick={addNode}
              disabled={isCreating}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              {isCreating ? (
                <span>Creating...</span>
              ) : (
                <>
                  <Plus size={16} />
                  Add Task
                </>
              )}
            </Button>
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

export default TaskPlanner;