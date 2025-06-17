import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ProfileFormData } from '../components/ProfileForm';
import { RequirementsFormData } from '../components/RequirementsForm';

interface ProjectRequirement {
  id: string;
  profileData: ProfileFormData;
  requirementsData: RequirementsFormData;
  timestamp: Timestamp;
}

const AdminPanel = () => {
  const [projects, setProjects] = useState<ProjectRequirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "project_requirements"));
        const fetchedProjects: ProjectRequirement[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ProjectRequirement[];
        setProjects(fetchedProjects);
      } catch (err) {
        console.error("Error fetching documents: ", err);
        setError("Falha ao carregar os projetos. Verifique sua conexão ou as regras do Firestore.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Carregando projetos...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Erro: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Painel Administrativo</h1>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Projetos de Requisitos</CardTitle>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <p className="text-center text-gray-600">Nenhum projeto de requisito encontrado ainda.</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome Cliente</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Tipo Projeto</TableHead>
                      <TableHead>Plataformas</TableHead>
                      <TableHead>Data Submissão</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.profileData?.name}</TableCell>
                        <TableCell>{project.profileData?.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{project.requirementsData?.projectType || 'N/A'}</Badge>
                        </TableCell>
                        <TableCell>
                          {project.requirementsData?.platforms && project.requirementsData.platforms.length > 0 ? (
                            project.requirementsData.platforms.map((platform: string, idx: number) => (
                              <Badge key={idx} variant="secondary" className="mr-1 mb-1">
                                {platform}
                              </Badge>
                            ))
                          ) : (
                            'N/A'
                          )}
                        </TableCell>
                        <TableCell>{project.timestamp?.toDate ? format(project.timestamp.toDate(), 'dd/MM/yyyy HH:mm', { locale: ptBR }) : 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel; 