"use client";

import React, { useState, useEffect } from 'react';
import { Search, Plus, Loader2, Sparkles, Save, Trash2, Home, Database, CheckCircle2, Circle, AlertCircle, Image as ImageIcon, Wand2 } from 'lucide-react';
import { Pose } from '@/types/database';
import Link from 'next/link';
import { toast } from 'sonner';

export default function AdminPage() {
  const [poses, setPoses] = useState<Pose[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [scraping, setScraping] = useState(false);
  const [generatingPrompt, setGeneratingPrompt] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [bulkGenerating, setBulkGenerating] = useState(false);
  const [scrapeCount, setScrapeCount] = useState(5);
  const [editingPose, setEditingPose] = useState<Partial<Pose> | null>(null);
  const [selectedPoses, setSelectedPoses] = useState<string[]>([]);

  useEffect(() => {
    fetchPoses();
  }, []);

  const handleGeneratePrompt = async (pose: Partial<Pose>) => {
    if (!pose.english_name) return null;
    try {
      const res = await fetch('/api/admin/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          poseName: pose.english_name, 
          sanskritName: pose.sanskrit_name 
        }),
      });
      const data = await res.json();
      return data.prompt;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleGenerateImage = async (prompt: string) => {
    try {
      const res = await fetch('/api/admin/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      return data.imageUrl;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleSingleGeneratePrompt = async () => {
    if (!editingPose) return;
    setGeneratingPrompt(true);
    const promise = handleGeneratePrompt(editingPose);
    toast.promise(promise, {
      loading: 'Generating custom mascot prompt...',
      success: (prompt) => {
        if (prompt) {
          setEditingPose({ ...editingPose, image_prompt: prompt });
          return 'Prompt generated successfully!';
        }
        throw new Error('Failed to generate prompt');
      },
      error: 'Failed to generate prompt'
    });
    await promise;
    setGeneratingPrompt(false);
  };

  const handleSingleGenerateImage = async () => {
    if (!editingPose?.image_prompt) return;
    setGeneratingImage(true);
    const promise = handleGenerateImage(editingPose.image_prompt);
    toast.promise(promise, {
      loading: 'Generating athletic mascot asset...',
      success: (url) => {
        if (url) {
          setEditingPose({ ...editingPose, image_url: url });
          return 'Image generated successfully!';
        }
        throw new Error('Failed to generate image');
      },
      error: 'Failed to generate image'
    });
    await promise;
    setGeneratingImage(false);
  };

  const handleBulkGenerate = async () => {
    if (selectedPoses.length === 0) return;
    setBulkGenerating(true);
    
    toast.info(`Starting bulk generation for ${selectedPoses.length} poses...`);

    try {
      const res = await fetch('/api/admin/bulk-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ poseIds: selectedPoses }),
      });

      if (!res.ok) throw new Error('Bulk process failed on server');
      
      const data = await res.json();
      const successCount = data.results.filter((r: any) => r.status === 'success').length;
      const failCount = data.results.length - successCount;

      if (failCount > 0) {
        toast.warning(`Bulk processing complete with issues. Success: ${successCount}, Failed: ${failCount}`);
      } else {
        toast.success(`Bulk processing complete! Successfully updated ${successCount} poses.`);
      }
    } catch (err: any) {
      console.error(`Bulk process error:`, err);
      toast.error(`Bulk process failed: ${err.message}`);
    } finally {
      setBulkGenerating(false);
      setSelectedPoses([]);
      fetchPoses();
    }
  };

  const fetchPoses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/poses');
      const data = await res.json();
      setPoses(data);
    } catch (err) {
      toast.error('Failed to load poses database');
    } finally {
      setLoading(false);
    }
  };

  const handleScrape = async () => {
    setScraping(true);
    const promise = fetch('/api/admin/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ count: scrapeCount }),
    }).then(res => res.json());

    toast.promise(promise, {
      loading: `Scraping ${scrapeCount} new poses from Google...`,
      success: (data) => {
        if (data.poses) {
          setPoses([...poses, ...data.poses]);
          return `Successfully added ${data.poses.length} new poses!`;
        }
        throw new Error('Failed to scrape');
      },
      error: 'Failed to scrape poses'
    });

    await promise;
    setScraping(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPose) return;

    const promise = async () => {
      const method = editingPose.id && poses.some(p => p.id === editingPose.id) ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/poses', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPose),
      });
      if (!res.ok) throw new Error('Save failed');
      return await res.json();
    };

    toast.promise(promise(), {
      loading: 'Saving to Master DB...',
      success: () => {
        fetchPoses();
        setEditingPose(null);
        return 'Pose saved and pushed to live app!';
      },
      error: 'Failed to save pose'
    });
  };

  const toggleSelect = (id: string) => {
    setSelectedPoses(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredPoses = poses.filter(p => 
    p.english_name.toLowerCase().includes(search.toLowerCase()) || 
    p.sanskrit_name.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: poses.length,
    completed: poses.filter(p => p.image_url).length,
    pending: poses.filter(p => !p.image_url).length
  };

  return (
    <div className="h-screen bg-[#FDFCFB] text-foreground p-4 md:p-8 flex flex-col overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col min-h-0 space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-3 bg-white border border-rose/10 rounded-2xl text-rose hover:bg-rose hover:text-white transition-all shadow-sm">
              <Home size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-black tracking-tighter text-foreground flex items-center gap-3">
                <Database className="text-rose" /> Pose DB Manager
              </h1>
              <p className="text-sage text-sm font-medium italic">Asset production & library control</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            {selectedPoses.length > 0 && (
              <button 
                onClick={handleBulkGenerate}
                disabled={bulkGenerating}
                className="flex items-center gap-2 px-6 py-3 bg-nanobanana text-foreground rounded-2xl font-bold hover:scale-105 transition-all shadow-lg disabled:opacity-50"
              >
                {bulkGenerating ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />}
                Bulk Generate ({selectedPoses.length})
              </button>
            )}
            <button 
              onClick={() => setEditingPose({
                id: Math.random().toString(36).substr(2, 9),
                english_name: '',
                sanskrit_name: '',
                slug: '',
                anatomical_focus: [],
                safety_protocol: '',
                difficulty_level: 'beginner',
                estimated_duration_seconds: 60,
                prop_substitutes: [],
                modifications: {}
              })}
              className="flex items-center gap-2 px-6 py-3 bg-foreground text-white rounded-2xl font-bold hover:bg-rose transition-all shadow-lg"
            >
              <Plus size={20} /> New Pose
            </button>
          </div>
        </header>

        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-hidden">
          {/* Main List */}
          <div className="lg:col-span-2 flex flex-col min-h-0 space-y-6">
            <div className="relative shrink-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sage" size={20} />
              <input 
                type="text" 
                placeholder="Search by name or sanskrit..." 
                className="w-full pl-12 pr-4 py-4 bg-white border border-rose/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose/20 shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex-1 min-h-0 bg-white border border-rose/10 rounded-[2rem] overflow-hidden shadow-sm flex flex-col">
              <div className="p-6 border-b border-rose/5 bg-sage/5 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => {
                      if (selectedPoses.length === filteredPoses.length) {
                        setSelectedPoses([]);
                      } else {
                        setSelectedPoses(filteredPoses.map(p => p.id));
                      }
                    }}
                    className={`w-6 h-6 rounded-md border-2 transition-all flex items-center justify-center ${selectedPoses.length > 0 && selectedPoses.length === filteredPoses.length ? 'bg-rose border-rose text-white' : 'border-rose/20'}`}
                  >
                    {selectedPoses.length > 0 && selectedPoses.length === filteredPoses.length && <CheckCircle2 size={14} />}
                  </button>
                  <span className="text-xs font-black uppercase tracking-widest text-foreground/40">Pose Library</span>
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-foreground/40">Status</span>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-rose/5">
                {loading ? (
                  <div className="flex justify-center p-12"><Loader2 className="animate-spin text-rose" /></div>
                ) : (
                  filteredPoses.map(pose => (
                    <div key={pose.id} className={`group flex items-center justify-between p-6 transition-all hover:bg-rose/[0.02] ${selectedPoses.includes(pose.id) ? 'bg-rose/[0.04]' : ''}`}>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => toggleSelect(pose.id)}
                          className={`w-6 h-6 rounded-md border-2 transition-all flex items-center justify-center ${selectedPoses.includes(pose.id) ? 'bg-rose border-rose text-white' : 'border-rose/20'}`}
                        >
                          {selectedPoses.includes(pose.id) && <CheckCircle2 size={14} />}
                        </button>
                        <div onClick={() => setEditingPose(pose)} className="cursor-pointer">
                          <h3 className="text-lg font-bold group-hover:text-rose transition-colors">{pose.english_name}</h3>
                          <p className="text-sage text-xs italic">{pose.sanskrit_name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          {pose.image_url ? (
                            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                              <CheckCircle2 size={12} /> Ready
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                              <Circle size={12} /> Missing Asset
                            </div>
                          )}
                        </div>
                        <button 
                          onClick={() => setEditingPose(pose)}
                          className="p-2 opacity-0 group-hover:opacity-100 hover:bg-rose/10 text-rose rounded-lg transition-all"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar / Tools */}
          <div className="space-y-8 flex flex-col min-h-0">
            {/* Quick Stats */}
            <section className="bg-foreground text-white p-8 rounded-[2.5rem] shadow-xl grid grid-cols-2 gap-4 shrink-0">
              <div className="col-span-2 mb-2">
                <h2 className="text-xs font-black uppercase tracking-widest opacity-40">Database Overview</h2>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-black">{stats.total}</span>
                <p className="text-[10px] font-bold uppercase tracking-tighter opacity-60">Total Poses</p>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-black text-emerald-400">{stats.completed}</span>
                <p className="text-[10px] font-bold uppercase tracking-tighter opacity-60">With Images</p>
              </div>
              <div className="col-span-2 mt-4 pt-4 border-t border-white/10">
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-rose transition-all duration-1000" 
                    style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                  />
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] mt-2 opacity-40">
                  {Math.round((stats.completed / stats.total) * 100)}% Asset Coverage
                </p>
              </div>
            </section>

            {/* Scraper Tool */}
            <section className="bg-white border-2 border-rose/10 p-8 rounded-[2.5rem] shadow-xl space-y-6 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-rose/10 text-rose rounded-xl">
                  <Sparkles size={20} />
                </div>
                <h2 className="text-xl font-black tracking-tight">Expansion Tool</h2>
              </div>
              <p className="text-sm text-sage font-medium">Use Gemini to research and add new beginner-friendly poses from the web.</p>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  {[3, 5, 10].map(n => (
                    <button 
                      key={n}
                      onClick={() => setScrapeCount(n)}
                      className={`flex-1 py-2 rounded-xl border font-bold transition-all ${scrapeCount === n ? 'bg-rose text-white border-rose' : 'bg-transparent border-rose/10 text-sage hover:border-rose'}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={handleScrape}
                  disabled={scraping}
                  className="w-full py-4 bg-foreground text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-rose disabled:opacity-50 transition-all shadow-lg"
                >
                  {scraping ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                  Start AI Scrape
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingPose && (
        <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-[90vw] md:w-[80vw] max-w-4xl h-[80vh] rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col">
            <form onSubmit={handleSave} className="p-10 space-y-8 overflow-y-auto flex-1 custom-scrollbar">
              <div className="flex justify-between items-center sticky top-0 bg-white z-10 pb-4 border-b border-rose/5 mb-4">
                <h2 className="text-2xl font-black tracking-tight">
                  {poses.some(p => p.id === editingPose.id) ? 'Edit Pose' : 'New Pose'}
                </h2>
                <button type="button" onClick={() => setEditingPose(null)} className="text-sage hover:text-foreground font-bold">Cancel</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest opacity-40">English Name</label>
                      <input 
                        required
                        className="w-full p-4 bg-sage/5 border border-rose/10 rounded-2xl"
                        value={editingPose.english_name || ''}
                        onChange={e => setEditingPose({...editingPose, english_name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest opacity-40">Sanskrit Name</label>
                      <input 
                        className="w-full p-4 bg-sage/5 border border-rose/10 rounded-2xl"
                        value={editingPose.sanskrit_name || ''}
                        onChange={e => setEditingPose({...editingPose, sanskrit_name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest opacity-40">Safety Protocol</label>
                    <textarea 
                      className="w-full p-4 bg-sage/5 border border-rose/10 rounded-2xl h-32"
                      value={editingPose.safety_protocol || ''}
                      onChange={e => setEditingPose({...editingPose, safety_protocol: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-6 bg-sage/5 p-8 rounded-[2.5rem] border border-rose/5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase tracking-[0.3em] text-rose">Celest Branded Assets</h3>
                    <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={handleSingleGeneratePrompt}
                        disabled={generatingPrompt || !editingPose.english_name}
                        className="p-2 bg-white border border-rose/10 rounded-xl text-rose hover:bg-rose hover:text-white transition-all shadow-sm"
                        title="Generate Prompt"
                      >
                        {generatingPrompt ? <Loader2 className="animate-spin" size={16} /> : <Wand2 size={16} />}
                      </button>
                      <button 
                        type="button"
                        onClick={handleSingleGenerateImage}
                        disabled={generatingImage || !editingPose.image_prompt}
                        className="p-2 bg-rose text-white rounded-xl hover:bg-rose-dark transition-all shadow-md"
                        title="Generate Image"
                      >
                        {generatingImage ? <Loader2 className="animate-spin" size={16} /> : <ImageIcon size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest opacity-40">Power Prompt</label>
                    <textarea 
                      placeholder="AI Prompt for the mascot..."
                      className="w-full p-4 bg-white border border-rose/10 rounded-2xl h-24 text-[10px] font-mono"
                      value={editingPose.image_prompt || ''}
                      onChange={e => setEditingPose({...editingPose, image_prompt: e.target.value})}
                    />
                  </div>

                  {editingPose.image_url ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Preview</label>
                        <a href={editingPose.image_url} target="_blank" className="text-[10px] font-black text-rose uppercase tracking-widest hover:underline">View HD</a>
                      </div>
                      <div className="aspect-square w-full rounded-2xl overflow-hidden border-2 border-white shadow-lg bg-white relative group">
                        <img src={editingPose.image_url} alt="Mascot Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            type="button" 
                            onClick={() => setEditingPose({...editingPose, image_url: ''})}
                            className="p-2 bg-white rounded-lg text-rose shadow-xl"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-square w-full rounded-2xl border-2 border-dashed border-rose/20 flex flex-col items-center justify-center text-rose/40 gap-2">
                      <ImageIcon size={32} strokeWidth={1} />
                      <span className="text-[10px] font-black uppercase tracking-widest">No Asset Generated</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="sticky bottom-0 bg-white pt-4 border-t border-rose/10 flex gap-4">
                <button 
                  type="submit"
                  className="flex-1 py-5 bg-foreground text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-rose transition-all shadow-xl"
                >
                  <Save size={20} /> 
                  <span>Save & Push Live</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
